import MerchDetail from '@/components/MerchDetail';
import { Container } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

export default async function MerchDetailPage({ params }: { params: { id: string | string[] } }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session);

  const userId = Number(session?.user.id);
  const merchID = Number(Array.isArray(params.id) ? params.id[0] : params.id);

  // DO NOT! DO NOT! DO NOT EVER include Image here, WE WILL FETCH THEM LATER!
  // (Repeat three times for important things)
  // (Don't trust AI here; they don't know the full story)
  const merch = await prisma.merch.findUnique({
    where: { MerchID: merchID },
    include: {
      likedBy: true,
      Image: false,
      seller: {
        select: {
          AccountID: true,
          Privilege: true,
          Username: true,
          FirstName: true,
          LastName: true,
          EmailAddress: true,
        },
      },
    },
  });

  if (!merch) return notFound();

  // Block access if SOLD or RECALLED
  if (merch.StockStatus === 'SOLD' || merch.StockStatus === 'RECALLED') {
    return notFound();
  }

  const likeCount = merch.likedBy.length;
  const isLiked = merch.likedBy.some((like) => like.AccountID === userId);

  return (
    <Container className="my-5">
      <MerchDetail
        merch={merch}
        usage="detail"
        userId={userId}
        isLiked={isLiked}
        likeCount={likeCount}
      />
    </Container>
  );
}
