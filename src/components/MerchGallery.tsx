'use client';

import { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const MerchGallery = ({ photograph }: { photograph : string[] }) => {
  if (photograph.length === 0) {
    photograph.push('');
  }
  const [selectedPhotographURL, setSelectedPhotographURL] = useState(photograph[0]);
  return (
    <Container fluid>
      <Container className="ratio ratio-1x1" fluid style={{ maxWidth: '600px' }}>
        <Image
          src={selectedPhotographURL}
          alt=""
          className="object-fit-cover rounded-2"
        />
      </Container>
      <Container className="pt-2" fluid>
        <Row>
          {photograph.map((photographURL) => (
            <Col className="ratio ratio-1x1 px-0" style={{ maxWidth: '120px' }}>
              <Image
                key={photographURL}
                src={photographURL}
                alt=""
                className={
                  `object-fit-cover
                  rounded-2
                  ${photographURL === selectedPhotographURL ? 'border border-3 border-success' : ''}`
                }
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
