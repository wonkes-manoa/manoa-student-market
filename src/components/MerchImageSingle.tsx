'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  merchID: number;
  // eslint-disable-next-line react/require-default-props
  imageID?: number;
}

export default function MerchImageSingle({ merchID, imageID }: Props) {
  const [base64, setBase64] = useState<string | null>(null);

  useEffect(() => {
    if (!imageID) return;

    const loadImage = async () => {
      const res = await fetch(`/api/download/merch-images?merchID=${merchID}`);
      const data = await res.json();

      if (data.length > 0) {
        setBase64(`data:${data[0].mimeType};base64,${data[0].base64}`);
      }
    };

    loadImage();
  }, [imageID, merchID]);

  // Fallback
  if (!imageID) {
    return (
      <Image
        src="/merch-photo/no-image-available.png"
        alt="No photo"
        className="object-fit-cover"
        width={70}
        height={70}
      />
    );
  }

  // Loading state
  if (!base64) {
    return <div className="w-100 h-100 bg-light" />;
  }

  return (
    <Image
      src={base64}
      alt="Merch"
      width={70}
      height={70}
    />
  );
}
