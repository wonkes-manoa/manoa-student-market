'use client';

import { Button, Col, Container, Row } from 'react-bootstrap';
import { Merch } from '@prisma/client';

const MerchPanel = ({
  merch,
  usage,
  likeCount,
}: {
  merch: Merch;
  usage: string;
  likeCount: number;
}) => {
  const dimensionValue = [merch.Length, merch.Width, merch.Height];
  const dimensionUnit = [merch.LUnit, merch.WUnit, merch.HUnit];
  let dimension = '';
  let mass = '';

  for (let index = 0; index < dimensionValue.length; ++index) {
    if (dimensionValue[index] && dimensionUnit[index]) {
      if (dimension !== '') {
        dimension += ' × ';
      }
      dimension += `${dimensionValue[index]} ${dimensionUnit[index]?.toLowerCase()}`;
    }
  }

  if (dimension !== '') {
    dimension = `Dimensions: ${dimension}`;
  }

  if (merch.Mass && merch.MUnit) {
    mass = `Mass: ${merch.Mass} ${merch.MUnit.toLowerCase()}`;
  }

  let likeText = '';
  if (likeCount === undefined) {
    likeText = '0 people have liked this product.';
  } else if (likeCount === 1) {
    likeText = '1 person has liked this product.';
  } else {
    likeText = `${likeCount} people have liked this product.`;
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <h2 className="fw-semibold text-break">{merch.Name}</h2>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h3 className="text-danger fw-bold">
            $
            {merch.Price.toFixed(2)}
          </h3>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <p className="text-secondary lh-base">{merch.Description}</p>
        </Col>
      </Row>

      {usage !== 'admin' && (
        <Row className="g-2 mb-3">
          <Col xs={12} md={6}>
            <Button variant="warning" className="w-100 fw-semibold">
              Get Seller&apos;s Contact
            </Button>
          </Col>
          <Col xs={12} md={6}>
            <Button href="/listings-view" variant="danger" className="w-100 fw-semibold">
              Return to Listings
            </Button>
          </Col>
        </Row>
      )}

      <Row className="mt-4 small text-muted">
        <Col>
          <p className="mb-1">
            Condition:
            {' '}
            {merch.Condition.toLowerCase()}
          </p>
          <p className="mb-1">
            Material:
            {' '}
            {merch.Material.toLowerCase()}
          </p>
          <p className="mb-1">{dimension}</p>
          <p className="mb-1">{mass}</p>
        </Col>
      </Row>

      <Row>
        <Col className="mt-3 d-flex justify-content-center">
          <p className="fw-semibold text-break">{likeText}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MerchPanel;
