// app/api/merch/page.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request) {
  const { search = '', page = '1', perPage = '5' } = Object.fromEntries(new URL(request.url).searchParams);

  const pageNumber = parseInt(page as string, 10);
  const itemsPerPage = parseInt(perPage as string, 10);

  // Count total items for pagination
  const totalCount = await prisma.merch.count({
    where: {
      Name: { contains: search as string, mode: 'insensitive' },
    },
  });

  // Fetch items for this page
  const merch = await prisma.merch.findMany({
    where: {
      Name: { contains: search as string, mode: 'insensitive' },
    },
    include: { likedBy: true }, // Include likes if needed
    skip: (pageNumber - 1) * itemsPerPage,
    take: itemsPerPage,
    orderBy: { PostTime: 'desc' },
  });

  return NextResponse.json({
    merch,
    totalPages: Math.ceil(totalCount / itemsPerPage),
    currentPage: pageNumber,
  });
}
