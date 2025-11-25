'use client';

import { useEffect, useState, useMemo } from 'react';
import MerchGallery from '@/components/MerchGallery';
import MerchPanel from '@/components/MerchPanel';
import { Container, Row, Col } from 'react-bootstrap';
import type { Merch } from '@prisma/client';

type MerchImageData = {
  id: number;
  mimeType: string;
  base64: string;
};

const MerchDetail = ({ merch, usage }: { merch: Merch, usage: string }) => {
  const [images, setImages] = useState<MerchImageData[]>([]);

  const fallbackImage = useMemo(
    () => ({
      id: -1,
      mimeType: 'image/png',
      base64: '',
      url: '/merch-photo/no-image-available.png',
    }),
    [],
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/download/merch-images?merchID=${merch.MerchID}`, {
          cache: 'no-store',
        });
        const data: MerchImageData[] = await res.json();

        // If there are images, take all, not just the first one. Otherwise use fallback.
        setImages(data.length > 0 ? data : [fallbackImage]);
      } catch (error) {
        console.error('Failed to fetch merch images', error);
        setImages([fallbackImage]);
      }
    };
    fetchImages();
  }, [fallbackImage, merch.MerchID]);

  return (
    <Container className="bg-white py-4 rounded-4" fluid>
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
          <MerchPanel merch={merch} usage={usage} />
        </Col>
      </Row>
    </Container>
  );
};

export default MerchDetail;
