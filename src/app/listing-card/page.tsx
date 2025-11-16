import { Container, Row } from 'react-bootstrap';
import ListingCard from '@/components/ListingCard';
import { prisma } from '@/lib/prisma';
import { ListingCardData } from '@/lib/ListingCardData';

const ListingsPage = async () => {
  const listings = await prisma.cardData.findMany({
    include: {
      photoItem: true,
    },
  });

  listings.sort((a, b) => a.id - b.id);

  return (
    <Container className="py-4">
      <h1 className="mb-4 fw-semibold">Marketplace</h1>

      <Row xs={1} md={3} className="g-4">
        {listings.map((profile) => {
          const normalized: ListingCardData = {
            ...profile,
            photoItem: profile.photoItem ?? null,
            price: profile.price != null ? String(profile.price) : null,
          };
          return <ListingCard key={profile.id} profile={normalized} />;
        })}
      </Row>
    </Container>
  );
};

export default ListingsPage;
