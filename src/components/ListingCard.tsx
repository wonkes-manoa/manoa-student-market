'use client';

import { Card, Col } from 'react-bootstrap';
import type { ListingCardData } from '@/lib/ListingCardData';
import Link from 'next/link';
import MerchImageSingle from '@/components/MerchImageSingle';

const ListingCard = ({ merch } : { merch : ListingCardData }) => (
  <Col>
    <Link
      href={`/merch-detail/${merch.MerchID}`}
      className="no-link-style"
    >
      <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="position-relative bg-light" style={{ height: '220px' }}>
          <MerchImageSingle merchID={merch.MerchID} imageID={merch.Image[0] ? merch.Image[0].ImageID : undefined} />
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

export default ListingCard;
