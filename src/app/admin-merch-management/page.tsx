import { Col, Container, Row } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import MerchSlip from '@/components/MerchSlip';

export default async function AdminMerchManagementPage() {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const merch = await prisma.merch.findMany({
    where: {},
    include: {
      Image: false, // We'll fetch images later by merch ID.
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
    <Container className="mt-5 mb-4">
      {merch.map((m) => (
        <Row className="mb-4">
          <Col>
            <MerchSlip key={m.MerchID} merch={m} usage="admin" />
          </Col>
        </Row>
      ))}
    </Container>
  );
}
