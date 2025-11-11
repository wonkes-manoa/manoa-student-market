import MerchGallery from '@/components/MerchGallery';
import MerchPanel from '@/components/MerchPanel';
import { Container, Row, Col } from 'react-bootstrap';
import { Merch } from '@prisma/client';

const MerchDetail = ({ merch } : { merch : Merch }) => (
  <Container fluid>
    <Row>
      <Col>
        <MerchGallery photograph={merch.Image} />
      </Col>
      <Col>
        <MerchPanel merch={merch} />
      </Col>
    </Row>
  </Container>
);

export default MerchDetail;
