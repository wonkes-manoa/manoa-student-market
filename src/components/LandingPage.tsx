'use client';

import { Col, Container, Row, Image, Button, Card } from 'react-bootstrap';

const LandingPage = () => (
  <Container id="landing-page" fluid className="py-3 bg-wonkes-7">
    <Row className="align-items-center py-5">
      <Col
        md={6}
        className="d-flex flex-column justify-content-center align-items-center text-center"
      >
        <h1>Welcome to Wonkes!</h1>
        <p>
          A Manoa-run marketplace where you can buy/sell items students need
          for campus dorming, classes, and school life!
        </p>
        <div className="d-flex gap-3">
          <Button href="/auth/signin" variant="dark">
            Log In
          </Button>
          <Button href="/auth/signin" variant="light">
            Sign Up
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
              Enim cupiditate quis ut id aut sed omnis et. Sit qui labore
              dolores cupiditate iste repellendus.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} md={4} className="text-center gap-3">
        <Card className="border-0 text-center">
          <Card.Img
            variant="top"
            src="/placeholder.jpg"
            alt="Image of Listings Page"
          />
          <Card.Body>
            <Card.Title>Buy and Sell Your Junk</Card.Title>
            <Card.Text className="text-muted">
              Enim cupiditate quis ut id aut sed omnis et. Sit qui labore
              dolores cupiditate iste repellendus.
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
              Enim cupiditate quis ut id aut sed omnis et. Sit qui labore
              dolores cupiditate iste repellendus.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LandingPage;
