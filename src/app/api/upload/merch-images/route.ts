import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { prisma } from '@/lib/prisma';
import { Merch } from '@prisma/client'; // type safety

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const merchId = parseInt(formData.get('MerchID') as string);
    const files = formData.getAll('Image') as File[];

    if (!merchId || files.length === 0) {
      return NextResponse.json({ error: 'No merchId or files' }, { status: 400 });
    }

    // confirm merch exists
    const merch = await prisma.merch.findUnique({ where: { MerchID: merchId } });
    if (!merch) {
      return NextResponse.json({ error: 'Merch not found' }, { status: 404 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'merch-photo');
    await fs.mkdir(uploadDir, { recursive: true });

    const imageUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || '.jpg';
      const newName = `${merchId}-${i + 1}${ext}`;
      const dest = path.join(uploadDir, newName);
      await fs.writeFile(dest, buffer);
      imageUrls.push(newName);
    }

    // merge with any existing images
    const updated = await prisma.merch.update({
      where: { MerchID: merchId },
      data: { Image: { set: [...(merch.Image ?? []), ...imageUrls] } },
    });

    return NextResponse.json({ success: true, urls: updated.Image });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
