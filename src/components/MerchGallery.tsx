'use client';

import { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const MerchGallery = ({ photograph }: { photograph : string[] }) => {
  if (photograph.length === 0) {
    photograph.push('');
  }
  const [selectedPhotographURL, setSelectedPhotographURL] = useState(photograph[0]);
  return (
    <Container className="px-0">
      <Container className="ratio ratio-1x1 px-0 mx-0" style={{ maxWidth: '600px' }}>
        <Image
          src={selectedPhotographURL}
          alt=""
          className="object-fit-cover"
        />
      </Container>
      <Container>
        <Row>
          {photograph.map((photographURL) => (
            <Col className="ratio ratio-1x1 px-0" style={{ maxWidth: '120px' }}>
              <Image
                key={photographURL}
                src={photographURL}
                width={120}
                className="object-fit-cover"
                onClick={() => setSelectedPhotographURL(photographURL)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default MerchGallery;
