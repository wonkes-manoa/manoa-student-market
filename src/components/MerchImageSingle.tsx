'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getMerchImagesByMerchID, MerchImage, parseImageSource } from '@/lib/merchImage';

interface Props {
  merchID: number;
  // eslint-disable-next-line react/require-default-props
  imageID?: number;
}

export default function MerchImageSingle({ merchID, imageID }: Props) {
  const [image, setImage] = useState<MerchImage | null>(null);

  useEffect(() => {
    async function fetchImages() : Promise<void> {
      const merchImage : MerchImage[] = await getMerchImagesByMerchID(merchID, true);
      if (imageID) {
        const found = merchImage.find((i) => i.id === imageID);
        setImage(found ?? null);
      } else {
        setImage(merchImage[0] ?? null);
      }
    }
    fetchImages();
  }, [merchID, imageID]);

  // Loading state.
  if (!image) {
    return <div className="w-100 h-100 bg-light" />;
  }

  return (
    <Image
      src={parseImageSource(image)}
      alt=""
      fill
      className="object-fit-cover"
    />
  );
}
