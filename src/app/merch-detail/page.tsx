import MerchDetail from '@/components/MerchDetail';
import { Container } from 'react-bootstrap';
import { Merch } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

export default async function MerchDetailPage({ merchID }: { merchID : number }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const merch : Merch | null = await prisma.merch.findUnique({
    where: { MerchID: merchID },
  });
  if (!merch) {
    return notFound();
  }
  return (
    <Container className="mt-5">
      <MerchDetail merch={merch} />
    </Container>
  );
}
