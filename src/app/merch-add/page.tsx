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
  return (
    <main className="bg-wonkes-7">
      <Container>
        <AddMerchForm id={3} />
      </Container>
    </main>
  );
};

export default AddMerch;
