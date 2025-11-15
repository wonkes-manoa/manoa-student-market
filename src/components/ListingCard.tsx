'use client';

import { Card, Col } from 'react-bootstrap';
import { ListingCardData } from '@/lib/ListingCardData';
import TooltipImage from './TooltipImage';

const ListingCard = ({ profile }: { profile: ListingCardData }) => {
  const firstPhoto = profile.photoItem ?? null;

  return (
    <Col>
      <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
        {/* Image Section */}
        <div className="position-relative bg-light" style={{ height: '220px' }}>
          <TooltipImage
            src={firstPhoto?.url ?? '/fallback.png'}
            name={profile.username ?? 'Unknown'}
            className="object-fit-cover w-100 h-100"
            width={100}
            roundedCircle={false}
          />
        </div>

        {/* Body */}
        <Card.Body className="p-3">
          {/* Product Name */}
          <Card.Title className="fw-semibold text-dark mb-2">
            {profile.username}
          </Card.Title>

          {/* Item Sold / Item Name */}
          <Card.Text className="text-muted mb-2">
            {profile.itemSold ?? 'No Item Listed'}
          </Card.Text>

          {/* Condition + Date */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <small className="text-uppercase text-muted d-block">Condition</small>
              <span className="fw-medium">{profile.quality ?? 'Unknown'}</span>
            </div>

            <div className="text-end">
              <small className="text-uppercase text-muted d-block">Listed</small>
              <span className="fw-medium">
                {profile.dateOfList
                  ? profile.dateOfList.toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ListingCard;
