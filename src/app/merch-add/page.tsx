import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container } from 'react-bootstrap';
import AddMerchForm from '@/components/AddMerchForm';

const AddMerch = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const accountId = Number(session?.user?.id);

  if (!accountId || Number.isNaN(accountId)) {
    throw new Error("Could not determine current user's account ID.");
  }

  return (
    <main className="flex-grow-1 bg-wonkes-7">
      <Container>
        <AddMerchForm id={accountId} />
      </Container>
    </main>
  );
};

export default AddMerch;
