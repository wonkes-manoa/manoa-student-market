import { Col, Container, Row, Button } from 'react-bootstrap';
import ListingCard from '@/components/ListingCard';
import { prisma } from '@/lib/prisma';
import { ListingCardData } from '@/lib/ListingCardData';
import { unstable_noStore as noStore } from 'next/cache';

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
    <Row /> {/* Empty row for spacing */}
    <div className="pb-5">
      <Row className="g-3">
        {Array.from({ length: 9 }).map((_, idx) => (
          <Col key={idx} md={4} sm={6} xs={12}>
            <div
              className="bg-light rounded text-black p-2 d-flex flex-column"
              style={{ minHeight: '140px', maxWidth: '100%' }}
            >
              <h5 className="text-center mb-2">Box {idx + 1}</h5>
              <p className="flex-grow-1 small mb-2">
                Placeholder content for box {idx + 1}.
              </p>
              <Button
                size="sm"
                className="d-block mx-auto bg-success text-black"
              >
                Learn More
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  </Container>

  // card usage when a database is present
  // noStore(); // Ensure nothing cached, and all data fetch from database upon every request.

  // const listings = await prisma.merch.findMany({
  //   include: {
  //     Image: true,
  //     seller: { select: { Username: true } }, // include username
  //   },
  // });

  // listings.sort((a, b) => a.MerchID - b.MerchID);

  // return (
  //   <Container className="py-4">
  //     <h1 className="mb-4 fw-semibold">Marketplace</h1>

  //     <Row xs={1} md={3} className="g-4">
  //       {listings.map((merch) => {
  //         const cardData: ListingCardData = {
  //           Image: merch.Image,
  //           Name: merch.Name,
  //           Price: merch.Price,
  //           Condition: merch.Condition,
  //           PostTime: merch.PostTime,
  //           seller: {
  //             Username: merch.seller.Username,
  //           },
  //           MerchID: merch.MerchID,
  //         };

  //         return (
  //           <ListingCard
  //             key={merch.MerchID}
  //             merch={cardData}
  //           />
  //         );
  //       })}
  //     </Row>
  //   </Container>
  // );
);

export default MyStorePage;
