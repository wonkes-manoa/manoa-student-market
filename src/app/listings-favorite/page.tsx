import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container } from 'react-bootstrap';
import ListingsClient from './ListingsClient';

export default async function ListingFavoritesPage() {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session);

  const userId = Number(session?.user.id);

  // fetch all merch liked by this user
  const likedMerch = await prisma.merch.findMany({
    where: {
      likedBy: {
        some: { AccountID: userId },
      },
    },
    include: {
      seller: { select: { Username: true } },
      Image: { select: { ImageID: true, MIMEType: true }, take: 1 },
      likedBy: { where: { AccountID: userId } },
    },
    orderBy: { PostTime: 'desc' },
  });

  const listingsWithLikes = likedMerch.map((m) => ({
    ...m,
    isLiked: true, // all returned items are liked
  }));

  return (
    <Container className="py-4 text-center">
      <h1 className="mb-4 fw-semibold">My Favorite Listings</h1>
      <ListingsClient initialListings={listingsWithLikes} userId={userId} />
    </Container>
  );
}
