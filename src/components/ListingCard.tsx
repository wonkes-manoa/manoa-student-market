'use client';

import { useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import type { ListingCardData } from '@/lib/ListingCardData';
import Link from 'next/link';
import MerchImageSingle from '@/components/MerchImageSingle';
import { Heart, HeartFill } from 'react-bootstrap-icons';

const ListingCard = ({ merch } : { merch : ListingCardData }) => {
  const [isLiked, setLiked] = useState(false);

  return (
    <Col className="position-relative">
      <Button
        variant="light"
        className="border-1 border-black p-2"
        style={{
          position: 'absolute',
          top: '10px',
          left: '30px',
          zIndex: 10,
          borderRadius: '50%',
        }}
        onClick={(e) => {
          e.preventDefault();
          setLiked(!isLiked);
        }}
      >
        {isLiked ? (
          <HeartFill size={20} fill="red" />
        ) : (
          <Heart size={20} />
        )}
      </Button>

      <Link
        href={`/merch-detail/${merch.MerchID}`}
        className="no-link-style"
      >
        <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
          <div className="position-relative bg-light" style={{ height: '220px' }}>
            <MerchImageSingle merchID={merch.MerchID} imageID={merch.Image[0]?.ImageID} />
          </div>

          <Card.Body className="p-3">
            <Card.Title className="fw-semibold text-dark mb-2 text-center">
              <u>{merch.Name}</u>
            </Card.Title>

            <Card.Title className="fw-semibold text-dark mb-2 text-center">
              $
              {merch.Price}
            </Card.Title>

            <Card.Text className="mb-2 text-center">
              Listed by:
              {' '}
              {merch.seller.Username}
            </Card.Text>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <small className="text-uppercase text-muted d-block">Condition</small>
                <span className="fw-medium">{merch.Condition}</span>
              </div>

              <div className="text-end">
                <small className="text-uppercase text-muted d-block">Listed</small>
                <span className="fw-medium">
                  {merch.PostTime.toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default ListingCard;
