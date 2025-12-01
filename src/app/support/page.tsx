import { Button, Col, Container, Row, Image } from 'react-bootstrap';
import { ArrowRepeat, Globe, Star } from 'react-bootstrap-icons';
import AccordionFAQ from './AccordionFAQ';

/** Render a list of stuff for the logged in user. */
const SupportPage = async () => (
  <main>
    <Container id="white-background" className="pb-5 pt-3">
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
              Wonkes is a web application that allows users to sell and buy items with
              just a click of a button. Users can create postings, browse for products,
              and connect with the community easily. Our mission is to provide a
              platform that fosters a safe and efficient marketplace for students to
              trade items they no longer need. Feel free to sign in to view everyones
              listings!
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
              Meet new people who are willing to buy/sell items.
              Connect through our website!
            </p>

            <h3>Buy and Sell Your Junk</h3>
            <p className="text-muted mt-2 mb-5">
              Buy items you need for college and items you don&apos;t
              want. All with just a click of a button!
            </p>

            <h3>Favorite Your Items</h3>
            <p className="text-muted mt-2">
              Like your favorite items to keep track of them! Easily access
              them later through the Favorited Listings page.
            </p>
          </Col>

        </Row>
      </Container>
      <hr />

      <Container className="d-flex flex-column px-5">
        <h2>Webpage Info</h2>
        <h5><u>Add Listings</u></h5>
        - Add your items you want to get rid of!
        <Image
          src="Add-Listings.png"
          alt="Add Listings Page"
          fluid
          rounded
          style={{ width: '75%', maxWidth: '350px' }}
          className="mb-3"
        />
        - View your created listings in the My Listings tab under Added Listings!
        <Image
          src="My-Store.png"
          alt="My Store Page"
          fluid
          rounded
          style={{ width: '75%', maxWidth: '350px' }}
          className="mb-3"
        />

        <h5><u>View Listings</u></h5>
        - Use the search bar to find the items you need!
        <Row>
          <Col className="mb-3">
            <Image
              src="View-Listings-1.png"
              alt="View Listings (1) Page"
              fluid
              rounded
              style={{ width: '75%', maxWidth: '350px' }}
            />
          </Col>
          <Col>
            <Image
              src="View-Listings-2.png"
              alt="View Listings (2) Page"
              fluid
              rounded
              style={{ width: '75%', maxWidth: '350px' }}
            />
          </Col>
        </Row>
        - Click the item to view more details.
        <Image
          src="View-Merch.png"
          alt="View Single Listing Page"
          fluid
          rounded
          style={{ width: '75%', maxWidth: '350px' }}
          className="mb-3"
        />
        - Like items you are interested in!
        <Image
          src="Like-Merch.png"
          alt="Like Item Image"
          fluid
          rounded
          style={{ width: '75%', maxWidth: '350px' }}
          className="mb-3"
        />
        - View your liked items in the My Listings tab under Favorited Listings!
        <Image
          src="Favorites-Page.png"
          alt="Favorites Page"
          fluid
          rounded
          style={{ width: '75%', maxWidth: '350px' }}
          className="mb-3"
        />

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
