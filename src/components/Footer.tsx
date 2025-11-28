import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-4 bg-wonkes-6 text-white border-top">
    <Container>
      <Row className="gy-4 text-center text-md-start">

        {/* Column 1 - Branding */}
        <Col xs={12} md={4}>
          <h5 className="fw-bold">Wonkes Market</h5>
          <p className="mb-1">A student-built online thrift market.</p>
          <p className="mb-0 small">
            ★&nbsp;
            {new Date().getFullYear()}
            {' '}
            Wonkes Team
          </p>
        </Col>

        {/* Column 2 - Contact / Institution */}
        <Col xs={12} md={4}>
          <h6 className="fw-semibold">University of Hawai&lsquo;i at Mānoa</h6>
          <p className="mb-1 small">Honolulu, HI 96822</p>
          <p className="mb-1 small">
            <a href="https://manoa.hawaii.edu" className="text-decoration-none text-wonkes-3">
              University Website
            </a>
          </p>
          <p className="mb-0 small">
            <a href="/support" className="text-decoration-none text-wonkes-3">
              Contact Wonkes
            </a>
          </p>
        </Col>

        {/* Column 3 — Useful Links */}
        <Col xs={12} md={4}>
          <h6 className="fw-semibold">Resources</h6>

          <p className="mb-1 small">
            <a href="/support" className="text-decoration-none text-wonkes-3">
              Support &amp; FAQ
            </a>
          </p>

          <p className="mb-1 small">
            <a
              href="https://wonkes-manoa.github.io/"
              className="text-decoration-none text-wonkes-3"
            >
              Wonkes Project Home Page
            </a>
          </p>

          <p className="mb-1 small">
            <a
              href="https://github.com/wonkes-manoa/manoa-student-market"
              className="text-decoration-none text-wonkes-3"
            >
              Wonkes Project Repository
            </a>
          </p>

          <p className="mb-0 small">
            <a href="/terms" className="text-decoration-none text-wonkes-3">
              Terms &amp; Academic Use
            </a>
          </p>
        </Col>
      </Row>

      {/* Bottom Line */}
      <Row className="pt-3 mt-3 border-top border-wonkes-5 text-center small">
        <Col>
          Made with ❤ by ICS Students and ChatGPT — ICS 314
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
