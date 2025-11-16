'use client';

import { Image } from 'react-bootstrap';
import type { FC } from 'react';

type Props = {
  image?: {
    id: number;
    mimeType: string;
    base64: string;
    url?: string;
  };
};

const defaultImage = {
  id: -1,
  mimeType: 'image/png',
  base64: '',
  url: '/merch-photo/no-image-available.png',
};

const MerchImageSingle: FC<Props> = ({
  image = defaultImage,
}: Props) => {
  const src = image.base64 && image.base64.length > 0
    ? `data:${image.mimeType};base64,${image.base64}`
    : image.url || '/merch-photo/no-image-available.png';

  return (
    <Image
      src={src}
      alt=""
      className="w-100 h-100"
      style={{ objectFit: 'contain' }}
    />
  );
};

MerchImageSingle.defaultProps = {
  image: defaultImage,
};

export default MerchImageSingle;
