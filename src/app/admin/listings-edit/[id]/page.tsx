import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';
import { Container } from 'react-bootstrap';
import EditMerchForm from '@/components/EditMerchForm';
import notFound from '@/app/not-found';
import { prisma } from '@/lib/prisma';
import { Merch } from '@prisma/client';

export default async function EditMerch({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only admin can access it.
  const session = await getServerSession(authOptions);
  adminProtectedPage(
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
    <main className="flex-grow-1 bg-wonkes-7">
      <Container>
        <EditMerchForm merch={merch} />
      </Container>
    </main>
  );
}
