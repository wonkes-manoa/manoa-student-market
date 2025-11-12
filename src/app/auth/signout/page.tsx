'use client';

import { signOut } from 'next-auth/react';
import { Button, Col, Container, Row, Card } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';

/* Confirmation page shown after the user clicks "Sign Out" in the navbar. */
const SignOut = () => (
  <Container
    id="signout-page"
    className="d-flex align-items-center justify-content-center py-5"
    style={{ minHeight: '70vh' }}
  >
    <Card className="p-4 shadow-sm text-center" style={{ maxWidth: '420px', width: '100%' }}>
      <Card.Body>
        <h1><BoxArrowRight className="mb-2" /></h1>
        <h3 className="fw-semibold mb-3 text-dark">Are you sure you want to sign out?</h3>
        <p className="text-muted mb-4">You&apos;ll need to log in again to access your account.</p>
        <Row className="g-2 justify-content-center">
          <Col xs={12} sm={6}>
            <Button
              variant="danger"
              className="w-100 fw-semibold"
              onClick={() => signOut({ callbackUrl: '/', redirect: true })}
            >
              Yes, Sign Out
            </Button>
          </Col>
          <Col xs={12} sm={6}>
            <Button
              variant="secondary"
              href="/"
              className="w-100 fw-semibold"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Container>
);

export default SignOut;
