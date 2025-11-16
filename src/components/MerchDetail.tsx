import MerchGallery, { getMerchImage } from '@/components/MerchGallery';
import MerchPanel from '@/components/MerchPanel';
import { Container, Row, Col } from 'react-bootstrap';
import { Merch } from '@prisma/client';

const MerchDetail = async ({ merch } : { merch : Merch }) => {
  const merchImages: {
    id: number;
    mimeType: string;
    base64: string;
  }[] = await getMerchImage(merch.MerchID);

  return (
    <Container className="bg-white py-4 rounded-4" fluid>
      <Row>
        <Col>
          <MerchGallery photograph={merchImages} />
        </Col>
        <Col>
          <MerchPanel merch={merch} />
        </Col>
      </Row>
    </Container>
  );
};

export default MerchDetail;
