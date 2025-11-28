'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthOnly({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }

  if (status === 'unauthenticated') {
    router.replace('/');
    return null;
  }

  return children;
}
