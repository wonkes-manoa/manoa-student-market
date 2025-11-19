import { Col, Container, Row } from 'react-bootstrap';
import ListingCard from '@/components/ListingCard';
import { prisma } from '@/lib/prisma';
import { ListingCardData } from '@/lib/ListingCardData';
import { unstable_noStore as noStore } from 'next/cache';

/** The user list page. */
const MyStore = async () => {

    <Container id="listing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Your Listings</h1>
        </Col>
        <Col>
          <h5>Filter by:</h5>
          <Container className="btn-group">
          <a href="#" className="btn btn-primary">Open Listings</a>
          <a href="#" className="btn btn-default">Archived</a>
          </Container>

        </Col>
      </Row>
      <Row />
      {' '}
      {/* Empty row for spacing */}
    </Container>
      noStore(); // Ensure nothing cached, and all data fetch from database upon every request.

  const listings = await prisma.merch.findMany({
    include: {
      Image: true,
      seller: { select: { Username: true } }, // include username
    },
  });

  listings.sort((a, b) => a.MerchID - b.MerchID);

  return (
    <Container className="py-4">
      <h1 className="mb-4 fw-semibold">Marketplace</h1>

      <Row xs={1} md={3} className="g-4">
        {listings.map((merch) => {
          const cardData: ListingCardData = {
            Image: merch.Image,
            Name: merch.Name,
            Price: merch.Price,
            Condition: merch.Condition,
            PostTime: merch.PostTime,
            seller: {
              Username: merch.seller.Username,
            },
            MerchID: merch.MerchID,
          };

          return (
            <ListingCard
              key={merch.MerchID}
              merch={cardData}
            />
          );
        })}
      </Row>
    </Container> 
  );
};

export default MyStore;
