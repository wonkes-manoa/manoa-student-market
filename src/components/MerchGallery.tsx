'use client';

import { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export function getMerchImage(merchID : number) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/download/merch-images?merchID=${merchID}`, {
    cache: 'no-store',
  }).then(result => result.json());
}

export const DEFAULT_IMAGE : {
  id: number,
  mimeType: string,
  base64: string;
  url?: string;
} = {
  id: -1,
  mimeType: 'image/png',
  base64: '',
  url: '/merch-photo/no-image-available.png',
};

export function parseImageSource(image : {
  id: number,
  mimeType: string,
  base64: string,
  url?: string,
}) {
  if (image.base64 && image.base64.length > 0) {
    return `data:${image.mimeType};base64,${image.base64}`;
  }
  return image.url;
}

const MerchGallery = ({ photograph }: { photograph : {
  id: number,
  mimeType: string,
  base64: string,
  url?: string,
}[] }) => {
  if (photograph.length === 0) {
    photograph.push(DEFAULT_IMAGE);
  }

  const [selectedPhotograph, setSelectedPhotograph] = useState(photograph[0]);

  return (
    <Container fluid>
      <Container className="ratio ratio-1x1" fluid style={{ maxWidth: '600px' }}>
        <Image
          src={parseImageSource(selectedPhotograph)}
          alt=""
          className="object-fit-cover rounded-2"
        />
      </Container>
      <Container className="pt-2" fluid>
        <Row>
          {photograph.map((photographData) => (
            <Col className="ratio ratio-1x1 px-0" key={photographData.id} style={{ maxWidth: '120px' }}>
              <Image
                key={photographData.id}
                src={parseImageSource(photographData)}
                alt=""
                className={
                  `object-fit-cover
                  rounded-2
                  ${photographData.id === selectedPhotograph.id ? 'border border-3 border-success' : ''}`
                }
                onClick={() => setSelectedPhotograph(photographData)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default MerchGallery;
