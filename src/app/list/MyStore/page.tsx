import { Col, Container, Image, Row } from 'react-bootstrap';

/** The user list page. */
const MyStore = () => (
  <main>
    <Container id="listing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Your Listings</h1>
        </Col> 
        <Col><p>Filter By: Open Listings | Archived</p></Col>
      </Row>
       <Row></Row> {/* Empty row for spacing */}
      <Row className="align-middle text-center">

      {/* 3x# Grid of user listings to go here | use ListingCard.tsx component */}
      </Row>

    </Container>
  </main>
);

export default MyStore;
