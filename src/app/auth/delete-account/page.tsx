'use client';

import AuthOnly from '@/components/AuthOnly';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { Button, Col, Container, Row, Card, Spinner, Modal, Alert } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

const DeleteAccountPage = () => {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [countdown, setCountdown] = useState(5); // 5-second countdown
  const [canClick, setCanClick] = useState(false);

  const handleDelete = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/delete-account', { method: 'DELETE' });

      if (!res.ok) {
        const data = await res.json();
        setError(data?.error || 'Failed to delete account.');
        setLoading(false);
        return;
      }

      // Sign out after deletion
      await signOut({ callbackUrl: '/' });
    } catch (err) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  useEffect(() => {
    setCountdown(5);
    setCanClick(false);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanClick(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showConfirm]); // reset timer every time modal opens

  return (
    <AuthOnly>
      <main
        className="flex-grow-1 d-flex align-items-center bg-wonkes-7"
        style={{ minHeight: '70vh' }}
      >
        <Container>
          <Card>
            <Card.Body className="text-center">
              <h1><Trash className="mb-2" /></h1>
              <h3 className="fw-semibold mb-3 text-dark">Delete your account?</h3>
              <p className="text-muted mb-4">
                Everything related to your account will be deleted, and this can not be undone
              </p>
              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
              <Row>
                <Col>
                  <Button
                    variant="danger"
                    className="w-100 fw-semibold"
                    onClick={() => setShowConfirm(true)}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      'Yes, Delete Now'
                    )}
                  </Button>
                </Col>
                <Col>
                  <Button
                    href="/"
                    className="w-100 fw-semibold bg-wonkes-1 border-0"
                    disabled={loading}
                  >
                    No, Take Me Back
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>

        {/* Confirmation Modal */}
        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This is the final warning
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={loading || !canClick}
            >
              {(() => {
                if (loading) {
                  return <Spinner animation="border" size="sm" />;
                }
                if (!canClick) {
                  return `Calm down ${countdown}s`;
                }
                return 'Delete Account Now';
              })()}
            </Button>
            <Button variant="secondary" onClick={() => setShowConfirm(false)} disabled={loading}>
              Cancel, Take Me Back!
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </AuthOnly>
  );
};

export default DeleteAccountPage;
