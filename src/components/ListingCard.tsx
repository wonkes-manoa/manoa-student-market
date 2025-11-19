'use client';

import { Card, Col } from 'react-bootstrap';
import type { ListingCardData } from '@/lib/ListingCardData';
import Link from 'next/link';
import MerchImageSingle from './MerchImageSingle';

const ListingCard = ({ merch }: { merch: ListingCardData }) => {
  const firstImageArr: {
    id: number;
    mimeType: string;
    base64: string;
    url?: string;
  }[] = merch.Image.length > 0
    ? [{
      id: merch.Image[0].ImageID,
      mimeType: merch.Image[0].MIMEType,
      base64: Buffer.from(merch.Image[0].Data).toString('base64'),
    }]
    : [];

  return (
    <Col>
      <Link
        href={`/listings-view/${merch.MerchID}`}
        className="no-link-style"
      >
        <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
          <div className="position-relative bg-light" style={{ height: '220px' }}>
            <MerchImageSingle image={firstImageArr[0]} />
          </div>

          <Card.Body className="p-3">
            {/* ITEM NAME */}
            <Card.Title className="fw-semibold text-dark mb-2 text-center">
              <u>{merch.Name}</u>
            </Card.Title>

            {/* PRICE */}
            <Card.Title className="fw-semibold text-dark mb-2 text-center">
              $
              {merch.Price}
            </Card.Title>

            {/* USER */}
            <Card.Text className="mb-2 text-center">
              Listed by:
              {' '}
              {merch.seller.Username}
            </Card.Text>

            {/* CONDITION + DATE */}
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
