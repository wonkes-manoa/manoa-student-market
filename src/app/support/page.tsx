import { Button, Col, Container, Row } from 'react-bootstrap';
import { ArrowRepeat, Globe, Star } from 'react-bootstrap-icons';
import AccordionFAQ from './AccordionFAQ';

/** Render a list of stuff for the logged in user. */
const SupportPage = async () => (
  <main>
    <Container id="support" className="pb-5 pt-3">
      <Container className="justifyContentCenter p-3">
        <h1 className="text-center text-decoration-underline">Wonkes Support</h1>
      </Container>
      <Container className="py-5">
        <Row className="g-5 align-items-start">

          {/* LEFT COLUMN */}
          <Col md={6} className="px-5">
            <p className="text-muted mb-1">Wonkes</p>
            <h2 className="mb-4">About Us</h2>
            <p className="text-muted pe-4">
              Et cupiditate eligendi rerum iusto reiciendis. Dolorem quo sed eligendi
              impedit incidunt quis. Enim cupiditate quis ut id aut sed omnis et.
              Sit qui labore dolores cupiditate iste repellendus. Quas voluptatem
              doloribus et non non. Quod soluta ratione et ipsa rerum et.
            </p>
          </Col>

          {/* ICON COLUMN */}
          <Col
            md={1}
            className="d-none d-md-flex flex-column align-items-center pt-2 gap-5"
          >
            <Button className="mb-5" variant="secondary" disabled>
              <Globe />
            </Button>
            <Button className="my-4" variant="secondary" disabled>
              <ArrowRepeat />
            </Button>
            <Button className="my-5" variant="secondary" disabled>
              <Star />
            </Button>
          </Col>

          {/* RIGHT COLUMN */}
          <Col md={5} className="pe-5">
            <h3>Connect with Students</h3>
            <p className="text-muted mt-2 mb-5">
              Enim cupiditate quis ut id aut sed omnis et.
              Sit qui labore dolores cupiditate iste repellendus.
            </p>

            <h3>Buy and Sell Your Junk</h3>
            <p className="text-muted mt-2 mb-5">
              Enim cupiditate quis ut id aut sed omnis et.
              Sit qui labore dolores cupiditate iste repellendus.
            </p>

            <h3>Favorite Your Trusted Vendor</h3>
            <p className="text-muted mt-2">
              Enim cupiditate quis ut id aut sed omnis et.
              Sit qui labore dolores cupiditate iste repellendus.
            </p>
          </Col>

        </Row>
      </Container>
      <hr />

      <Container className="px-5">
        <h2>Webpage Info</h2>
        <p>TBD (Images of Websites needed)</p>
      </Container>

      <hr />
      <Container className="px-5">
        <h2>FAQ</h2>
        <AccordionFAQ />
        <p className="my-2">
          For more information, click
          {' '}
          <a href="https://wonkes-manoa.github.io/" target="_blank" rel="noreferrer">here</a>
        </p>
      </Container>

      <hr />
      <Container className="px-5">
        <h2>Contact us</h2>
        <p>
          Have a question? Feel free to email myemail@foo or call us at (808)111-1111
          for more information!
        </p>
      </Container>
    </Container>
  </main>
);

export default SupportPage;
