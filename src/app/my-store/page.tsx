import { Container } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

export default async function MyStorePage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const accountID = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
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
      {merch.map((m) => <MerchSlip key={m.MerchID} merch={m} />)}
    </Container>
  );
}
