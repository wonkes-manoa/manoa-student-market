import { Col, Container, Row } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import MerchSlip from '@/components/MerchSlip';

export default async function MyStorePage() {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const accountID = Number((session && session.user && session.user.id) || '');
  const merch = await prisma.merch.findMany({
    where: {
      AccountID: accountID,
    },
    include: {
      Image: false, // We'll fetch images later by merch ID.
    },
  });
  if (!merch) {
    return (
      notFound()
    );
  }

  return (
    <Container className="mt-5 mb-4 bg-wonkes-7 p-4 rounded-4 shadow-sm">
      <p className="text-muted my-2">Wonkes</p>
      <h2 className="mb-4">My Listings Added:</h2>

      {merch.length === 0 ? (
        <p className="text-center">No merch created.</p>
      ) : (
        merch.map((m) => (
          <Row key={m.MerchID} className="mb-4">
            <Col>
              <MerchSlip merch={m} usage="admin" />
            </Col>
          </Row>
        ))
      )}
    </Container>
  );
}
