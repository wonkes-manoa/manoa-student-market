import MerchGallery from '@/components/MerchGallery';
import MerchPanel from '@/components/MerchPanel';
import { Container, Row, Col } from 'react-bootstrap';
import { Merch } from '@prisma/client';

const MerchDetail = async ({ merch } : { merch : Merch }) => {
  const images: {
    id: number;
    mimeType: string;
    base64: string;
  }[] = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/download/merch-images?merchID=${merch.MerchID}`, {
    cache: 'no-store',
  }).then(result => result.json());

  return (
    <Container className="bg-white py-4 rounded-4" fluid>
      <Row>
        <Col>
          <MerchGallery photograph={images} />
        </Col>
        <Col>
          <MerchPanel merch={merch} />
        </Col>
      </Row>
    </Container>
  );
};

export default MerchDetail;
