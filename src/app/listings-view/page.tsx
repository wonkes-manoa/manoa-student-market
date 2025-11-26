import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import ListingsClient from './ListingsClient';

export default async function ListingsPage() {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const listings = await prisma.merch.findMany({
    include: {
      Image: {
        select: { ImageID: true, MIMEType: true }, // We'll load image itself later.
        take: 1,
      },
      seller: { select: { Username: true } },
    },
    orderBy: {
      MerchID: 'asc',
    },
  });

  return (
    <Container id="support" className="py-4 text-center">
      <h1 className="mb-4 fw-semibold">View Listings</h1>
      <p>
        View listings that others made. Search through items using search
        bar or scroll through offers below!
      </p>
      {/* Pass server-fetched data to client component */}
      <ListingsClient initialListings={listings} />
    </Container>
  );
}
