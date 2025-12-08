import { Col, Container, Row } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import ListingsClient from './ListingsClient';

export default async function AdminMerchManagementPage() {
  const session = await getServerSession(authOptions);
  console.log('Session from getServerSession:', session);

  adminProtectedPage(session);
  const merch = await prisma.merch.findMany({
    include: {
      likedBy: true,
      Image: true, // optional, can be false if you always fetch images later
    },
  });

  return (
    <Container className="py-4 text-center">
      <Row>
        <Col className="bg-wonkes-7 p-4 rounded-4 shadow-sm">
          <h1 className="mb-4 fw-semibold">Merch Management</h1>
          <p>Search for items to edit or delete by merch name.</p>
          <ListingsClient initialListings={merch} />
        </Col>
      </Row>
    </Container>
  );
}
