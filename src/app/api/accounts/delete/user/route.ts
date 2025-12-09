import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

/* eslint-disable import/prefer-default-export */
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { accountId } = await request.json();
  const currentUserId = session.user.id;
  const currentPrivilege = session.user.randomKey;

  // Only admins can delete
  if (currentPrivilege !== 'ADMIN' && currentPrivilege !== 'ADMINISTRATOR') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Cannot delete self
  if (Number(accountId) === Number(currentUserId)) {
    return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
  }

  try {
    await prisma.account.delete({
      where: { AccountID: Number(accountId) },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete user', details: err }, { status: 500 });
  }
}
