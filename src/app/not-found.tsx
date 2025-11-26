'use client';

import { Col, Container, Row, Button } from 'react-bootstrap';
import Link from 'next/link';

const NotFound = () => (
  <Container
    className="flex-grow-1 d-flex align-items-end"
    style={{
      minHeight: '70vh',
      backgroundImage: "url('/utility/middle-of-nowhere.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    fluid
  >
    <Container className="pb-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Container
            className="text-center p-3"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <p className="text-danger fw-semibold mb-4">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved.
              Check the URL or return to a safe location.
            </p>

            <Row className="g-2 justify-content-center">
              <Col xs={12} sm={6}>
                <Link href="/" className="w-100">
                  <Button variant="outline-success" className="w-100 fw-semibold border-wonkes-4">
                    Return Home
                  </Button>
                </Link>
              </Col>

              <Col xs={12} sm={6}>
                <Link href="/support" className="w-100">
                  <Button variant="outline-info" className="w-100 fw-semibold">
                    Contact Support
                  </Button>
                </Link>
              </Col>
            </Row>

          </Container>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default NotFound;
