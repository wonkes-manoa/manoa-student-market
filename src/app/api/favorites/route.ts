import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

/* eslint-disable import/prefer-default-export */
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const params = new URL(request.url).searchParams;
  const search = params.get('search') ?? '';
  const page = Number(params.get('page') ?? 1);
  const perPage = Number(params.get('perPage') ?? 10);

  const where: Prisma.MerchWhereInput = {
    likedBy: {
      some: {
        AccountID: userId,
      },
    },
    Name: {
      contains: search,
      mode: Prisma.QueryMode.insensitive,
    },
  };

  const totalCount = await prisma.merch.count({ where });

  const items = await prisma.merch.findMany({
    where,
    include: {
      Image: { select: { ImageID: true, MIMEType: true }, take: 1 },
      seller: { select: { Username: true } },
      likedBy: { where: { AccountID: userId } },
    },
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { MerchID: 'desc' },
  });

  const itemsWithLike = items.map((item) => ({
    ...item,
    isLiked: item.likedBy.length > 0, // true if user liked it
    likedBy: undefined, // optional: remove the raw likedBy array
  }));

  return NextResponse.json({
    items: itemsWithLike,
    totalPages: Math.ceil(totalCount / perPage),
    currentPage: page,
    totalCount,
  });
}
