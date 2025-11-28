import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable import/prefer-default-export */
export async function DELETE(req: NextRequest) {
  const merchID = Number(req.nextUrl.searchParams.get('merchID'));
  await prisma.merchImage.deleteMany({ where: { MerchID: merchID } });
  return NextResponse.json({ ok: true });
}
