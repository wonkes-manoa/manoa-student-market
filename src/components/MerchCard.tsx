import { Merch } from '@prisma/client';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import { DEFAULT_IMAGE, getMerchImage, parseImageSource } from '@/lib/dbActions';

const MerchCard = async ({ merch } : { merch : Merch }) => {
  const merchImages: {
    id: number;
    mimeType: string;
    base64: string;
  }[] = await getMerchImage(merch.MerchID);
  if (merchImages.length === 0) {
    merchImages.push(DEFAULT_IMAGE);
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Container className="ratio ratio-1x1" fluid style={{ maxWidth: '300px' }}>
              <Image
                src={parseImageSource(merchImages[0])}
                alt=""
                className="object-fit-cover rounded-2"
              />
            </Container>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MerchCard;
