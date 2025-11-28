'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

// A logged-in user gets redirected before accessing stuff wrapped in the GuestOnly component.
export default function GuestOnly({ children } : { children : React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (session?.user) {
    redirect('/listings-view');
  }

  return children;
}
