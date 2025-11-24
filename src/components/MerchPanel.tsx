import { Button, Col, Container, Row } from 'react-bootstrap';
import { Merch } from '@prisma/client';

const MerchPanel = ({ merch, usage }: { merch : Merch, usage: string }) => {
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

      {(usage && usage === 'admin'
        && (
        <Row className="g-2">
          <Col xs={12} md={6}>
            <Button variant="warning" className="w-100 fw-semibold">
              Edit
            </Button>
          </Col>
          <Col xs={12} md={6}>
            <Button href="/listing-card" variant="danger" className="w-100 fw-semibold">
              Mark as Sold
            </Button>
          </Col>
        </Row>
        ))
        || (
        <Row className="g-2">
          <Col xs={12} md={6}>
            <Button variant="warning" className="w-100 fw-semibold">
              Get Seller&apos;s Contact
            </Button>
          </Col>
          <Col xs={12} md={6}>
            <Button href="/listing-card" variant="danger" className="w-100 fw-semibold">
              Return to Listings
            </Button>
          </Col>
        </Row>
        )}

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
            {dimension}
          </p>
          <p className="mb-1">
            {mass}
          </p>
          {usage && usage === 'admin'
            && (
              <>
                <p className="mb-1">
                  {`
                    Stock status:
                    ${merch.StockStatus.toLowerCase().replace('_', ' ')}
                  `}
                </p>
                <p className="mb-0">
                  {`
                    Posted time:
                    ${merch.PostTime.toTimeString()}
                  `}
                </p>
              </>
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default MerchPanel;
