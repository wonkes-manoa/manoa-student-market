import MerchDetail from '@/components/MerchDetail';
import { Col, Container, Row } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

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
      Image: true,
    },
  });
  if (!merch) {
    return (
      notFound()
    );
  }

  const rows = [];
  for (let i = 0; i < merch.length; i += 2) {
    rows.push(merch.slice(i, i + 2));
  }

  return (
    <Container className="mt-5">
      {rows.map((row) => (
        <Row key={row[0].MerchID} className="g-4 mb-3">
          {row.map((m) => (
            <Col key={m.MerchID} md={6} className="my-3">
              <MerchDetail merch={m} usage="admin" />
            </Col>
          ))}
          {row.length === 1 && <Col md={6} />}
        </Row>
      ))}
    </Container>
  );
}
