import MerchGallery from '@/components/MerchGallery';
import MerchPanel from '@/components/MerchPanel';
import { Merch, MerchStockStatus, MerchMaterial, MerchCondition, LengthUnit, MassUnit } from '@prisma/client';
import { Container, Row, Col } from 'react-bootstrap';

const testPhotograph : string[] = [
  '/merch-photo/test-1.jpeg',
  '/merch-photo/test-2.jpeg',
  '/merch-photo/test-3.jpeg',
  '/merch-photo/test-4.jpeg',
  '/merch-photo/test-5.jpeg',
  '/merch-photo/test-6.png',
];

const testMerch : Merch = {
  MerchID: 1,
  AccountID: 101,
  PostTime: new Date('2025-11-10T12:00:00Z'),
  StockStatus: MerchStockStatus.ON_STOCK,
  Price: 89.99,
  Name: 'Stainless Steel Electric Kettle – Fast Boil, Auto Shut-off, BPA-Free, 1.7L',
  Description:
    `A durable stainless steel electric kettle designed for quick boiling.
    Features include automatic shut-off, LED indicator, 360° base, and boil-dry
    protection. Perfect for home, office, or dorm use.`,
  Image: testPhotograph,
  Length: 20.0,
  Width: 20.0,
  Height: 25.0,
  Mass: 1.5,
  LUnit: LengthUnit.CENTIMETER,
  WUnit: LengthUnit.INCH,
  HUnit: LengthUnit.FEET,
  MUnit: MassUnit.KILOGRAM,
  Material: MerchMaterial.ALUMINUM,
  Condition: MerchCondition.EXCELLENT,
  seller: {
    AccountID: 101,
    Privilege: 'USER',
    EmailAddress: 'seller@example.com',
    Password: 'hashedpassword', // just for mock; not used in frontend
  },
};

const MerchDetail = () => (
  <Container fluid>
    <Row>
      <Col>
        <MerchGallery photograph={testMerch.Image} />
      </Col>
      <Col>
        <MerchPanel merch={testMerch} />
      </Col>
    </Row>
  </Container>
);

export default MerchDetail;
