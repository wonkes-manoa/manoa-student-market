import MerchGallery from '@/components/MerchGallery';

const testPhotograph : string[] = [
  '../../public/merch-photo/test-1.jpeg',
  '../../public/merch-photo/test-2.jpeg',
  '../../public/merch-photo/test-3.jpeg',
  '../../public/merch-photo/test-4.jpeg',
  '../../public/merch-photo/test-5.jpeg',
  '../../public/merch-photo/test-6.png',
];

const MerchDetail = () => (
  <MerchGallery photograph={testPhotograph} />
);

export default MerchDetail;
