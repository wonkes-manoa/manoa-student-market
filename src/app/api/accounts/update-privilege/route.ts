import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/* eslint-disable import/prefer-default-export */
export async function POST(request: Request) {
  const { accountId, newPrivilege } = await request.json();

  if (!accountId || !newPrivilege) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const updated = await prisma.account.update({
      where: { AccountID: Number(accountId) },
      data: { Privilege: newPrivilege },
    });
    return NextResponse.json({ success: true, account: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update privilege', details: err }, { status: 500 });
  }
}
