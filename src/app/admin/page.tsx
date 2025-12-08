import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { adminProtectedPage } from '@/lib/page-protection';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  adminProtectedPage(session); // ensures only admins can view

  return (
    <main className="flex-grow-1 bg-wonkes-7">
      <h1 className="text-center py-4">Admin Dashboard</h1>
      <a href="/admin/user-management" className="d-block text-center my-3">
        User Management
      </a>
      <a href="/admin/merch-management" className="d-block text-center my-3">
        Merch Management
      </a>
    </main>
  );
}
