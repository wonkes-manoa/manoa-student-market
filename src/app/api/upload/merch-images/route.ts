import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/* eslint-disable import/prefer-default-export */
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const merchID = Number(formData.get('merchID'));
  const imageFiles = formData.getAll('images') as File[];

  if (Number.isNaN(merchID)) {
    return NextResponse.json({ error: 'Invalid merchID' }, { status: 400 });
  }

  const createdImages = [];

  /* eslint-disable no-await-in-loop */
  for (const file of imageFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const created = await prisma.merchImage.create({
      data: {
        merchID,
        FileName: file.name,
        MIMEType: file.type,
        Data: buffer,
      },
    });
    /* eslint-enable no-await-in-loop */

    createdImages.push(created.ImageID);
  }

  return NextResponse.json({ ok: true, images: createdImages });
}
