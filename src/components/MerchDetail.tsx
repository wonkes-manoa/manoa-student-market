'use client';

import { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import MerchGallery from '@/components/MerchGallery';
import MerchPanel from '@/components/MerchPanel';
import type { Merch } from '@prisma/client';
import { getMerchImagesByMerchID, MerchImage } from '@/lib/merchImage';

interface Props {
  merch: Merch & { likedBy?: any[] };
  usage: string;
  userId: number;
  isLiked: boolean;
  likeCount: number;
}

export default function MerchDetail({ merch, usage, userId, isLiked: initialIsLiked, likeCount: initialCount }: Props) {
  const [images, setImages] = useState<MerchImage[]>([]);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialCount);

  useEffect(() => {
    async function fetchImages() {
      setImages(await getMerchImagesByMerchID(merch.MerchID, true));
    }
    fetchImages();
  }, [merch.MerchID]);

  const toggleLike = useCallback(async () => {
    const res = await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ merchId: merch.MerchID, userId }),
    });

    if (!res.ok) return;

    const data = await res.json();
    setIsLiked(data.liked);
    setLikeCount(data.likeCount);
  }, [merch.MerchID, userId]);

  return (
    <Container className="bg-white py-4 rounded-4" fluid>
      <Row>
        <Col md={6} className="position-relative">
          <Button
            variant="light"
            className="p-2 shadow position-absolute"
            style={{ top: '-12px', left: '12px', zIndex: 50, borderRadius: '50%' }}
            onClick={toggleLike}
          >
            {isLiked ? <HeartFill size={24} fill="red" /> : <Heart size={24} />}
          </Button>

          {images.length > 0 ? (
            <MerchGallery photograph={images} />
          ) : (
            <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center">
              Loading image...
            </div>
          )}
        </Col>

        <Col md={6}>
          <MerchPanel merch={merch} usage={usage} likeCount={likeCount} />
        </Col>
      </Row>
    </Container>
  );
}
