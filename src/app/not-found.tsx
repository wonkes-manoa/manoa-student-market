'use client';

import { Col, Container, Row, Button } from 'react-bootstrap';
import Link from 'next/link';

const NotFound = () => (
  <main
    className="flex-grow-1 d-flex align-items-center bg-wonkes-7"
    style={{ minHeight: '70vh' }}
  >
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="text-center p-4 bg-white rounded-4 shadow-sm">
            {/* Large 404 Header */}
            <h1 className="display-3 fw-bold text-danger mb-3">
              404
            </h1>

            {/* Explanation */}
            <h3 className="fw-semibold mb-3">
              Page Not Found
            </h3>
            <p className="text-muted mb-4">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
              Please check the URL or return to the home page.
            </p>

            {/* Navigation Buttons */}
            <Row className="g-2 justify-content-center">
              <Col xs={12} sm={6}>
                <Link href="/" className="w-100">
                  <Button className="w-100 fw-semibold bg-wonkes-1 border-0">
                    Return Home
                  </Button>
                </Link>
              </Col>

              <Col xs={12} sm={6}>
                <Link href="/support" className="w-100">
                  <Button variant="info" className="w-100 fw-semibold text-white">
                    Contact Support
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default NotFound;
