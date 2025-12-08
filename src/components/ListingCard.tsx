'use client';

import { useState, useCallback } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import type { ListingCardData } from '@/lib/ListingCardData';
import Link from 'next/link';
import MerchImageSingle from '@/components/MerchImageSingle';

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
    <Col className="position-relative">
      {/* Like Button */}
      <Button
        variant="light"
        className="p-2 shadow"
        style={{
          position: 'absolute',
          top: '10px',
          left: '30px',
          zIndex: 10,
          borderRadius: '50%',
        }}
        onClick={(e) => {
          e.preventDefault(); // prevent link navigation
          toggleLike();
        }}
      >
        {isLiked ? <HeartFill size={20} fill="red" /> : <Heart size={20} />}
      </Button>

      {/* Card */}
      <Link href={`/merch-detail/${merch.MerchID}`} className="no-link-style">
        <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
          <div className="position-relative bg-light" style={{ height: '220px' }}>
            <MerchImageSingle
              merchID={merch.MerchID}
              imageID={merch.Image[0]?.ImageID}
            />
          </div>
          <Card.Body className="p-3 text-center">
            <Card.Title><u>{merch.Name}</u></Card.Title>
            <Card.Title>
              $
              {merch.Price}
            </Card.Title>
            <Card.Text>
              Listed by:
              {merch.seller.Username}
            </Card.Text>
            <small className="text-muted d-block">Condition</small>
            <span>{merch.Condition}</span>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}
