import MerchDetail from '@/components/MerchDetail';
import { Container } from 'react-bootstrap';
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

  return (
    <Container className="mt-5">
      <div
        className="d-grid"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
          gap: '2rem',
        }}
      >
        {merch.map((m) => (
          <div
            key={m.MerchID}
            style={{
              transform: 'scale(0.5)',
              transformOrigin: 'top left',
              width: '200%', // compensates for scale(0.4) width shrink
              height: '200%', // compensates for scale(0.4) height shrink
            }}
          >
            <MerchDetail merch={m} usage="admin" />
          </div>
        ))}
      </div>
    </Container>
  );
}
