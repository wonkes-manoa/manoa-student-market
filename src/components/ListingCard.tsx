'use client';

import { Card, Col, Badge } from 'react-bootstrap';
// eslint-disable-next-line import/extensions
import { ListingCardData } from '@/lib/ListingCardData';
import TooltipImage from './TooltipImage';

const ListingCard = ({ profile }: { profile: ListingCardData }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <TooltipImage
          className=""
          src={profile.picture ? profile.picture : 'No Img Provided'}
          name={profile.username}
          width={50}
          roundedCircle
        />
      </Card.Header>
      <Card.Body>
        <Card.Text>{profile.username}</Card.Text>
        <Card.Text>
          {profile.item}
          
        </Card.Text>
        <h5>Projects</h5>
        {profile.Condition.map((project) => (

        ))}
      </Card.Body>
    </Card>
  </Col>
);

export default ListingCard;
