import { Button, Col, Container, Row } from 'react-bootstrap';
import { ArrowRepeat, Globe, Star } from 'react-bootstrap-icons';
import RevealOnScroll from '@/components/Animations';
import AccordionFAQ from './AccordionFAQ';

const SupportPage = async () => (
  <main>
    <Container id="support-background" className="pb-5 pt-3">
      <Container className="justifyContentCenter p-3">
        <h1 className="text-center fw-bold text-dark display-4">Wonkes Support</h1>
      </Container>
      <Container className="py-5">
        <Row className="g-5 align-items-start">

          {/* LEFT COLUMN */}
          <Col md={6} className="p-5 gap-5" style={{ marginTop: '80px' }}>
            <RevealOnScroll className="mb-4" delay="0.2s">
              <h2 className="mb-4 display-6">Our goal</h2>
              <p className="text-muted pe-4">
                Wonkes is an online marketplace designed for students attending
                University of Hawaiʻi. Our goal is to make buying and selling school
                supplies and dormitory furnitures time-saving and money-saving.
                Instead of throwing stuffs away students can list them on Wonkes;
                instead of buying new supplies students can find cheaper secondhand
                choices from their dorm neighbors.
                <br />
                <br />
                Sign in now to view everyone&apos;s listings (˶˃ ᵕ ˂˶)
              </p>
            </RevealOnScroll>
          </Col>

          {/* ICON COLUMN */}
          {/* ICON + RIGHT COLUMN WRAPPER */}
          <Col
            md={6}
            className="d-flex flex-row align-items-start p-4 support-text-box"
          >
            {/* ICON COLUMN */}
            <RevealOnScroll className="mb-4" delay="0.4s">
              <div className="d-none d-md-flex flex-column align-items-center pt-2 gap-5 me-4">
                <Button className="my-3 support-button" variant="success" disabled>
                  <Globe size={40} />
                </Button>
                <Button className="my-4 support-button" variant="success" disabled>
                  <ArrowRepeat size={40} />
                </Button>
                <Button className="my-3 support-button" variant="success" disabled>
                  <Star size={40} />
                </Button>
              </div>
            </RevealOnScroll>

            {/* RIGHT COLUMN */}
            <RevealOnScroll className="mb-4" delay="0.6s">
              <div className="flex-grow-1">
                <h3>Connect with schoolmates</h3>
                <p className="text-muted mt-2 mb-5">
                  Meet new people willing to buy or sell their stuffs.
                  Begin the connection at our website!
                </p>

                <h3>Recycle usable supplies and furnitures</h3>
                <p className="text-muted mt-2 mb-5">
                  Sell what you don&apos;t need; buy what you need cheap.
                </p>

                <h3>Favorite stuffs </h3>
                <p className="text-muted mt-2">
                  Put an eye on what you like, and access them later easily.
                </p>
              </div>
            </RevealOnScroll>
          </Col>
        </Row>
      </Container>
      <hr />

      <Container className="px-5 mt-2">
        <h2 className="mb-3">FAQ</h2>
        <AccordionFAQ />
        <p className="my-3">
          For more information, click
          {' '}
          <a className="link-wonkes" href="https://wonkes-manoa.github.io/" target="_blank" rel="noreferrer">here</a>
          .
        </p>
      </Container>

      <hr />
      <Container className="px-5 mb-2">
        <div style={{ paddingTop: '20px' }}>
          <h2>Contact us</h2>
          <p>
            Have a question or whatnot?
            Send an email to
            {' '}
            <b>yuhang34@hawaii.edu</b>
            !
            Please allow 14 days for a response.
          </p>
        </div>
      </Container>
    </Container>
  </main>
);

export default SupportPage;
