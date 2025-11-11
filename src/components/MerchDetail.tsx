import MerchGallery from '@/components/MerchGallery';
import { Container, Row, Col } from 'react-bootstrap';

const testPhotograph : string[] = [
  '/merch-photo/test-1.jpeg',
  '/merch-photo/test-2.jpeg',
  '/merch-photo/test-3.jpeg',
  '/merch-photo/test-4.jpeg',
  '/merch-photo/test-5.jpeg',
];

const MerchDetail = () => (
  <Container>
    <Row>
      <Col>
        <MerchGallery photograph={testPhotograph} />
      </Col>
      <Col />
    </Row>
  </Container>
);

export default MerchDetail;
