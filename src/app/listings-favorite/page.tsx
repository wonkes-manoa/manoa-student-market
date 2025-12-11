import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Col, Container, Row } from 'react-bootstrap';
import ListingsClient from './ListingsClient';

export default async function ListingFavoritesPage() {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session);

  const userId = Number(session?.user.id);

  return (
    <Container className="py-4 text-center">
      <Row>
        <Col className="bg-wonkes-7 p-4 rounded-4">
          <h1 className="mb-4 fw-semibold">My Favorite Listings</h1>
          <ListingsClient userId={userId} />
        </Col>
      </Row>

    </Container>
  );
}
