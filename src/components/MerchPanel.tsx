import { Button, Col, Container, Row } from 'react-bootstrap';
import { Merch } from '@prisma/client';

const MerchPanel = ({ merch }: { merch : Merch }) => (
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

    <Row className="g-2">
      <Col xs={12} md={6}>
        <Button variant="warning" className="w-100 fw-semibold">
          Get Seller&apos;s Contact
        </Button>
      </Col>
      <Col xs={12} md={6}>
        <Button variant="danger" className="w-100 fw-semibold">
          Message Seller Now
        </Button>
      </Col>
    </Row>

    <Row className="mt-4 small text-muted">
      <Col>
        <p className="mb-1">
          Condition:&nbsp;
          {merch.Condition.toLowerCase()}
        </p>
        <p className="mb-1">
          Material:&nbsp;
          {merch.Material.toLowerCase()}
        </p>
        <p className="mb-1">
          {`
            Dimensions:
            ${merch.Length} ${merch.LUnit.toLowerCase()} ×
            ${merch.Width} ${merch.WUnit.toLowerCase()} ×
            ${merch.Height} ${merch.HUnit.toLowerCase()}
          `}
        </p>
        <p className="mb-0">
          {`
            Weight:
            ${merch.Mass} ${merch.MUnit.toLowerCase()}
          `}
        </p>
      </Col>
    </Row>
  </Container>
);

export default MerchPanel;
