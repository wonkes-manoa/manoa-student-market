'use client';

import { Col, Container, Row, Image, Button, Card } from 'react-bootstrap';
import GuestOnly from '@/components/GuestOnly';

const LandingPage = () => (
  <GuestOnly>
    <Container id="landing-page" fluid className="py-3 bg-wonkes-7">
      <Row className="align-items-center py-5">
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{ paddingLeft: '160px' }}
        >
          <h1>Welcome to Wonkes!</h1>
          <p>
            A Manoa-run marketplace where you can buy/sell items students need
            for campus dorming, classes, and school life!
          </p>
          <div className="d-flex gap-3">
            <Button href="/auth/signin" className="bg-wonkes-1 border-0">
              Log in
            </Button>
            <Button href="/auth/signup" variant="light">
              Sign up
            </Button>
          </div>
        </Col>

        <Col
          md={6}
          className="d-none d-md-flex d-flex justify-content-center"
        >
          <Image
            src="sunset-wonkes.png"
            alt="Wonkes logo"
            fluid
            rounded
            style={{ width: '75%', maxWidth: '350px' }}
          />
        </Col>
      </Row>

      <Row className="py-5">
        <Col sm={6} md={4}>
          <Card className="border-0 text-center">
            <Card.Img
              variant="top"
              src="/placeholder.jpg"
              alt="Image of website designers"
            />
            <Card.Body>
              <Card.Title>Connect with Students</Card.Title>
              <Card.Text className="text-muted">
                Meet new people who are willing to buy/sell items.
                Connect through our website!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={4} className="text-center gap-3">
          <Card className="border-0 text-center">
            <Card.Img
              variant="top"
              src="/View-Listings-1.png"
              alt="Image of Listings Page"
            />
            <Card.Body>
              <Card.Title>Buy and Sell Your Junk</Card.Title>
              <Card.Text className="text-muted">
                Buy items you need for college and items you don&apos;t
                want. All with just a click of a button!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={6} md={4} className="text-center">
          <Card className="border-0 text-center">
            <Card.Img
              variant="top"
              src="/placeholder.jpg"
              alt="Image of Liking Vendor"
            />
            <Card.Body>
              <Card.Title>Favorite Your Trusted Vendor</Card.Title>
              <Card.Text className="text-muted">
                This is yet to be implemented. Update on this soon!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </GuestOnly>
);

export default LandingPage;
