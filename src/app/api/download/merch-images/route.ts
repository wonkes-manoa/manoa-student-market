import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable import/prefer-default-export */
export async function GET(req: NextRequest) {
  const merchID = Number(req.nextUrl.searchParams.get('merchID'));

  const images = await prisma.merchImage.findMany({
    where: { merchID },
  });

  const output = images.map((image: {
    ImageID: number;
    MIMEType: string;
    Data: any;
  }) => ({
    id: image.ImageID,
    mimeType: image.MIMEType,
    base64: Buffer.from(image.Data).toString('base64'),
  }));

  return NextResponse.json(output);
}
