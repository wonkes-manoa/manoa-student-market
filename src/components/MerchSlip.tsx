'use client';

import { useEffect, useState } from 'react';
import MerchGallery from '@/components/MerchGallery';
import MerchPanel from '@/components/MerchPanel';
import MerchManage from '@/components/MerchManage';
import { Container, Row, Col } from 'react-bootstrap';
import type { Merch } from '@prisma/client';
import { getMerchImagesByMerchID, MerchImage } from '@/lib/merchImage';

const MerchSlip = ({ merch, usage }: { merch: Merch, usage: string }) => {
  const [images, setImages] = useState<MerchImage[]>([]);

  useEffect(() => {
    async function fetchImages() : Promise<void> {
      setImages(await getMerchImagesByMerchID(merch.MerchID, true));
    }
    fetchImages();
  }, [merch.MerchID]);

  return (
    <Container className="bg-white py-4 rounded-4 overflow-hidden" fluid>
      <Row>
        <Col md={4}>
          {images.length > 0 ? (
            <MerchGallery photograph={images} />
          ) : (
            <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center">
              Loading image...
            </div>
          )}
        </Col>
        <Col md={4}>
          <MerchPanel merch={merch} usage={usage} />
        </Col>
        <Col md={4}>
          <MerchManage merch={merch} />
        </Col>
      </Row>
    </Container>
  );
};

export default MerchSlip;
