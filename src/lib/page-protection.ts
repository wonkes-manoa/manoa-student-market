import { redirect } from 'next/navigation';
import { AccountPrivilege } from '@prisma/client';

/**
 * Redirects to the login page if the user is not logged in.
 */
export const loggedInProtectedPage = (
  session: { user: { email: string; id: string; randomKey: string } } | null,
) => {
  if (!session) {
    redirect('/auth/signin');
  }
};

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the not-authorized page if the user is not an admin.
 */
export const adminProtectedPage = (
  session: { user: { email: string; id: string; randomKey: string } } | null,
) => {
  loggedInProtectedPage(session);

  // Check against AccountPrivilege enum
  const privilege = session?.user?.randomKey?.toString().trim();
  if (privilege !== AccountPrivilege.ADMIN) {
    redirect('/not-authorized');
  }
};
