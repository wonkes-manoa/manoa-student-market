'use client';

import { useState } from 'react';
import { Card, Image } from 'react-bootstrap';

const MerchGallery = ({ photograph }: { photograph : string[] }) => {
  if (photograph.length === 0) {
    photograph.push('');
  }
  const [selectedPhotographURL, setSelectedPhotographURL] = useState(photograph[0]);
  return (
    <Card>
      <Card.Body>
        <Image
          src={selectedPhotographURL}
          alt=""
        />
        {photograph.map((item) => (
          <Image
            key={item}
            src={item}
            onClick={() => setSelectedPhotographURL(item)}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default MerchGallery;
