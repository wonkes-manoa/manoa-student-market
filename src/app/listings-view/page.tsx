// app/listings/page.tsx
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import ListingsClient from './ListingsClient';

export default async function ListingsPage() {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session);

  const userId = Number(session?.user.id);

  // Fetch merch with seller, first image, and likes by current user
  const listings = await prisma.merch.findMany({
    include: {
      Image: { select: { ImageID: true, MIMEType: true }, take: 1 },
      seller: { select: { Username: true } },
      likedBy: { where: { AccountID: userId } }, // user-specific likes
    },
    orderBy: { MerchID: 'asc' },
  });

  // Map isLiked for client component
  const listingsWithLikes = listings.map((m) => ({
    ...m,
    isLiked: m.likedBy.length > 0,
  }));

  return (
    <Container className="py-4 text-center">
      <Row>
        <Col className="bg-wonkes-7 p-4 rounded-4 shadow-sm">
          <h1 className="mb-4 fw-semibold">View Listings</h1>
          <p>View listings others made. Search or scroll through offers below!</p>

          <ListingsClient initialListings={listingsWithLikes} userId={userId} />
        </Col>
      </Row>
    </Container>
  );
}
