import { Col, Container, Row, Button } from 'react-bootstrap';
// import ListingCard from '@/components/ListingCard';
// import { prisma } from '@/lib/prisma';
// import { ListingCardData } from '@/lib/ListingCardData';
// import { unstable_noStore as noStore } from 'next/cache';

/** The user list page. */
const MyStorePage = async () => (
  <Container id="listing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Your Listings</h1>
      </Col>
      <Col>
        <h5>Filter by:</h5>
        <Container className="btn-group">
          <a href="/" className="btn btn-primary">
            Open Listings
          </a>
          <a href="/" className="btn btn-default">
            Archived
          </a>
        </Container>
      </Col>
    </Row>
    <Row />
    {/* Empty row for spacing */}
    <div className="pb-5">
      <Row className="g-3">
        {
          // Create a stable list of boxes with deterministic ids so we don't use the array index as key
          Array.from({ length: 9 })
            .map((_, i) => ({
              id: `box-${i + 1}`,
              title: `Box ${i + 1}`,
              body: `Placeholder content for box ${i + 1}.`,
            }))
            .map((box) => (
              <Col key={box.id} md={4} sm={6} xs={12}>
                <div
                  className="bg-light rounded text-black p-2 d-flex flex-column"
                  style={{ minHeight: '140px', maxWidth: '100%' }}
                >
                  <h5 className="text-center mb-2">{box.title}</h5>
                  <p className="flex-grow-1 small mb-2">{box.body}</p>
                  <Button
                    size="sm"
                    className="d-block mx-auto bg-success text-black"
                  >
                    Learn More
                  </Button>
                </div>
              </Col>
            ))
        }
      </Row>
    </div>
  </Container>
);

export default MyStorePage;
