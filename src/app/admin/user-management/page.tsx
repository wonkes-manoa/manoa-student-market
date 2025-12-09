// app/accounts/page.tsx
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';
import Link from 'next/link';
import UserClient from './UserClient';

export default async function AccountsPage() {
  const session = await getServerSession(authOptions);
  adminProtectedPage(session); // ensures only admins can view

  const userId = Number(session?.user.id);

  // Fetch all accounts
  const accounts = await prisma.account.findMany({
    orderBy: { AccountID: 'asc' },
    select: {
      AccountID: true,
      Username: true,
      EmailAddress: true,
      FirstName: true,
      LastName: true,
      Privilege: true,
      _count: {
        select: { merch: true }, // count how many Merch items this account has
      },
    },
  });

  return (
    <Container className="py-4 text-center">
      <Row>
        <Col className="bg-wonkes-7 p-4 rounded-4 shadow-sm">
          <h1 className="mb-4 fw-semibold">View Accounts</h1>
          <p>List of all registered accounts (Use &apos;ctrl+f&apos; to find specific info). </p>
          <Link href="/admin/merch-management" className="d-block text-center my-3">
            View Merch Management
          </Link>
          <UserClient accounts={accounts} userId={userId} />
        </Col>
      </Row>
    </Container>
  );
}
