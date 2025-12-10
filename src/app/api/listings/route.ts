import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { Prisma } from '@prisma/client';
import { MerchWithRelations } from '@/types/merch';

/* eslint-disable import/prefer-default-export */
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user.id);

  const params = new URL(request.url).searchParams;
  const search = params.get('search') ?? '';
  const page = Number(params.get('page') ?? 1);
  const perPage = Number(params.get('perPage') ?? 10);

  const where: Prisma.MerchWhereInput = {
    Name: {
      contains: search,
      mode: Prisma.QueryMode.insensitive,
    },
    StockStatus: {
      notIn: ['SOLD', 'RECALLED'], // exclude sold or recalled
    },
  };

  const totalCount = await prisma.merch.count({ where });

  const listings = await prisma.merch.findMany({
    where,
    include: {
      Image: { select: { ImageID: true, MIMEType: true }, take: 1 },
      seller: { select: { Username: true } },
      likedBy: { where: { AccountID: userId } },
    },
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { MerchID: 'asc' },
  }) as MerchWithRelations[];

  const items = listings.map((m) => ({
    ...m,
    isLiked: m.likedBy.length > 0,
  }));

  return NextResponse.json({
    items,
    totalPages: Math.ceil(totalCount / perPage),
    currentPage: page,
    totalCount,
  });
}
