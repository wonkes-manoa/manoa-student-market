import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light-subtle">
    <Container>
      <Row>
        <Col>
          <span className="fw-bold d-block">Support</span>
          <span><a href="/support" className="link-underline-opacity-0">Support Page</a></span>
        </Col>
        <Col>
            <span className="fw-bold d-block">LOCATION</span>
            <span className="small text-uppercase opacity-75 d-block mb-2">Kailua</span>
            <span className="d-block">32 Malinu Ave,</span>
            <span className="d-block">Kailua, HI 96734</span>
            <span className="d-block">(808) 261-6733</span>
          </Col>
        <Col>
          Contact Us:
        </Col>
        <Col className="text-center">
          Department of Information and Computer Sciences
          <br />
          University of Hawaii
          <br />
          Honolulu, HI 96822
          <br />
          <a href="http://ics-software-engineering.github.io/nextjs-application-template">Template Home Page</a>
        </Col>
      </Row>
      <Row>
        <Col className="text-center h6">
          &copy; {new Date().getFullYear()} Wonke's Market
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
