// app/api/like/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* eslint-disable import/prefer-default-export */
export async function POST(req: Request) {
  const { merchId, userId } = await req.json();

  // Check existing like
  const existing = await prisma.likedMerch.findUnique({
    where: { AccountID_MerchID: { AccountID: userId, MerchID: merchId } },
  });

  if (existing) {
    await prisma.likedMerch.delete({
      where: { AccountID_MerchID: { AccountID: userId, MerchID: merchId } },
    });
  } else {
    await prisma.likedMerch.create({
      data: { AccountID: userId, MerchID: merchId },
    });
  }

  const newLikeCount = await prisma.likedMerch.findMany({
    where: { MerchID: merchId },
  });

  if (existing) {
    return NextResponse.json({ liked: false, likeCount: newLikeCount.length });
  }
  return NextResponse.json({ liked: true, likeCount: newLikeCount.length });
}
