import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col lg={3} className="d-flex justify-content-center mb-3 mb-lg-0">
          <h1>Welcome to Wonkes!</h1>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
