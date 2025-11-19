import MerchDetail from '@/app/listings-view/[id]/MerchDetail';
import { Container } from 'react-bootstrap';
import { Merch } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

export default async function MerchDetailPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const merchID = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  const merch : Merch | null = await prisma.merch.findUnique({
    where: { MerchID: merchID },
  });
  if (!merch) {
    return (
      notFound()
    );
  }
  return (
    <Container className="my-5">
      <MerchDetail merch={merch} usage="" />
    </Container>
  );
}
