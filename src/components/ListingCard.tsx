'use client';

import { useState, useCallback } from 'react';
import { Button, Card, Col, Container } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import type { ListingCardData } from '@/lib/ListingCardData';
import Link from 'next/link';
import MerchImageSingle from '@/components/MerchImageSingle';
import RevealOnScroll from '@/components/Animations';

type ListingCardWithLike = ListingCardData & { isLiked?: boolean };

interface Props {
  merch: ListingCardWithLike;
  userId: number;
}

export default function ListingCard({ merch, userId }: Props) {
  const [isLiked, setIsLiked] = useState(merch.isLiked ?? false);

  const toggleLike = useCallback(async () => {
    const res = await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ merchId: merch.MerchID, userId }),
    });

    if (!res.ok) return;
    const data = await res.json();
    setIsLiked(data.liked);
  }, [merch.MerchID, userId]);

  return (
    <Col style={{ width: '25%' }}>
      {/* Like Button */}
      <RevealOnScroll
        className=""
        delay="0.15s"
      >
        <Button
          variant="light"
          className="shadow"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 10,
            borderRadius: '50%',
            width: 40,
            aspectRatio: 1 / 1,
            padding: 0,
          }}
          onClick={(e) => {
            e.preventDefault(); // prevent link navigation
            toggleLike();
          }}
        >
          {isLiked ? <HeartFill size={18} fill="red" /> : <Heart size={18} />}
        </Button>

        {/* Card */}
        <Link href={`/merch-detail/${merch.MerchID}`} className="no-link-style">
          <Card className="h-100 py-0 shadow-sm border-0 overflow-hidden">
            <Container className="ratio ratio-1x1">
              <MerchImageSingle
                merchID={merch.MerchID}
                imageID={merch.Image[0]?.ImageID}
              />
            </Container>
            <Card.Body
              className="px-3 py-2 d-flex flex-column justify-content-between"
              style={{ minHeight: '155px', textAlign: 'left' }}
            >
              <Card.Title
                className="fw-semibold small text-truncate"
                style={{
                  whiteSpace: 'normal',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {merch.Name}
              </Card.Title>

              <Container className="px-0 text-align-left text-secondary">
                <p className="fw-bold text-danger mb-0">
                  $
                  {merch.Price.toFixed(2)}
                </p>
                <p className="mb-1 small">
                  Condition:
                  {' '}
                  {merch.Condition.toLowerCase()}
                </p>
                <p className="mb-1 small">
                  Seller:
                  {' '}
                  {merch.seller.Username}
                </p>
              </Container>
            </Card.Body>
          </Card>
        </Link>
      </RevealOnScroll>
    </Col>
  );
}
