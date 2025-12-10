import { Col, Container, Row } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';
import Link from 'next/link';
import MerchClient from './MerchClient';

export default async function AdminMerchManagementPage() {
  const session = await getServerSession(authOptions);
  adminProtectedPage(session);

  return (
    <Container className="py-4 text-center">
      <Row>
        <Col className="bg-wonkes-7 p-4 rounded-4 shadow-sm">
          <h1 className="mb-4 fw-semibold">Merch Management</h1>
          <p>Search through merch to edit or delete.</p>

          <Link href="/admin/user-management" className="d-block text-center my-3">
            View User Management
          </Link>

          <MerchClient />
        </Col>
      </Row>
    </Container>
  );
}
