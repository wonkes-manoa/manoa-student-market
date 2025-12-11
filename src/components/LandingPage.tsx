'use client';

import { Col, Container, Row, Image, Button, Card } from 'react-bootstrap';
import GuestOnly from '@/components/GuestOnly';
import RevealOnScroll from '@/components/Animations';

const LandingPage = () => (
  <GuestOnly>
    <Container
      id="landing-page"
      fluid
      className="py-3 bg-wonkes-7"
    >
      <Row className="align-items-center py-5">
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{ paddingLeft: '160px' }}
        >
          <RevealOnScroll
            className="w-100 d-flex flex-column justify-content-center align-items-center text-center"
            delay="0s"
          >
            <h1>Welcome to Wonkes!</h1>

            <h5>
              A student-built online thrift market where you can
              buy or sell school supplies and dormitory furnitures.
              Great for school life!
            </h5>

            <div className="d-flex gap-3 justify-content-center">
              <Button
                href="/auth/signin"
                className="bg-wonkes-1 border-0"
              >
                Sign in
              </Button>

              <Button
                href="/auth/signup"
                variant="light"
              >
                Sign up
              </Button>
            </div>
          </RevealOnScroll>
        </Col>

        <Col
          md={6}
          className="d-none d-md-flex d-flex justify-content-center"
        >
          <Image
            src="sunset-wonkes.png"
            alt=""
            fluid
            rounded
            style={{ width: '75%', maxWidth: '350px' }}
          />
        </Col>
      </Row>

      <Row className="py-5">
        <Col sm={6} md={4}>
          <RevealOnScroll className="" delay="0s">
            <Card className="border-0 text-center">
              <Card.Img
                variant="top"
                src="/connect.jpg"
                alt=""
                className="card-img-fixed"
              />
              <Card.Body>
                <Card.Title>Connect with schoolmates</Card.Title>
                <Card.Text className="text-muted">
                  Meet new people willing to buy or sell their stuffs. Begin the connection at our website!
                </Card.Text>
              </Card.Body>
            </Card>
          </RevealOnScroll>
        </Col>

        <Col sm={6} md={4}>
          <RevealOnScroll className="" delay="0.15s">
            <Card className="border-0 text-center">
              <Card.Img
                variant="top"
                src="/View-Listings-1.png"
                alt="Image of Listings Page"
                className="card-img-fixed"
              />
              <Card.Body>
                <Card.Title>Recycle usable supplies and furnitures</Card.Title>
                <Card.Text className="text-muted">
                  Sell what you don&apos;t need; buy what you need cheap.
                </Card.Text>
              </Card.Body>
            </Card>
          </RevealOnScroll>
        </Col>

        <Col sm={6} md={4}>
          <RevealOnScroll className="" delay="0.30s">
            <Card className="border-0 text-center">
              <Card.Img
                variant="top"
                src="/Like-Merch.png"
                alt="Image of Liking Vendor"
                className="card-img-fixed"
              />
              <Card.Body>
                <Card.Title>Favorite stuffs</Card.Title>
                <Card.Text className="text-muted">
                  Put an eye on what you like, and access them later easily.
                </Card.Text>
              </Card.Body>
            </Card>
          </RevealOnScroll>
        </Col>
      </Row>
    </Container>
  </GuestOnly>
);

export default LandingPage;
