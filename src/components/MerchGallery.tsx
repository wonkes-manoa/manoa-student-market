'use client';

import { DEFAULT_IMAGE, parseImageSource } from '@/lib/dbActions';
import { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

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
