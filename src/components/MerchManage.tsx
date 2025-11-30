'use client';

import { Container, Row, Col, Button } from 'react-bootstrap';
import { Merch, MerchStockStatus } from '@prisma/client';

const statusColorMap: Record<MerchStockStatus, string> = {
  ON_STOCK: 'bg-wonkes-6',
  RECALLED: 'bg-warning',
  SOLD: 'bg-info',
};

const statusLabelMap: Record<MerchStockStatus, string> = {
  ON_STOCK: 'ON STOCK',
  RECALLED: 'RECALLED',
  SOLD: 'SOLD',
};

const MerchManage = ({ merch }: { merch : Merch }) => {
  const statusColor = statusColorMap[merch.StockStatus] || 'bg-danger';
  const statusLabel = statusLabelMap[merch.StockStatus] || 'ERROR';

  return (
    <Container
      fluid
      className="position-relative"
      style={{ minHeight: '100%' }}
    >
      {/* Stock status ribbon. */}
      <div
        className={`position-absolute text-white px-5 py-2 fw-bold ${statusColor}`}
        style={{
          top: '20px',
          right: '-143px',
          transform: 'rotate(30deg)',
          fontSize: '2.5rem',
          width: '500px',
          textAlign: 'center',
        }}
      >
        {statusLabel}
      </div>

      <Container style={{ minHeight: '305px' }} />

      {/* Button area. */}
      <Row>
        <Col className="text-center">
          <Button
            href={`listings-edit/${merch.MerchID}`}
            variant="warning"
            className="w-100 fw-semibold"
          >
            Edit Merch
          </Button>
        </Col>
      </Row>

      {merch.StockStatus !== 'SOLD' && (
      <Row className="mt-2">
        <Col className="text-center">
          <Button
            variant="info"
            className="w-100 fw-semibold"
          >
            Mark as Sold
          </Button>
        </Col>
      </Row>
      )}
    </Container>
  );
};

export default MerchManage;
