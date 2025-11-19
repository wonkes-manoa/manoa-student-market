'use client';

import { useState } from 'react';
import { Row, Form } from 'react-bootstrap';
import ListingCard from '@/components/ListingCard';
import { ListingCardData } from '@/lib/ListingCardData';

interface Props {
  initialListings: ListingCardData[];
}

export default function ListingsClient({ initialListings }: Props) {
  const [search, setSearch] = useState('');
  const [listings] = useState(initialListings);

  const filtered = listings.filter((item) => item.Name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Form>
        <Form.Group controlId="search" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search item keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Row xs={1} md={3} className="g-4 pt-5">
        {filtered.map((merch) => (
          <ListingCard key={merch.MerchID} merch={merch} />
        ))}
      </Row>
    </>
  );
}
