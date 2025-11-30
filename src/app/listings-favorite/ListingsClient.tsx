'use client';

import { useState } from 'react';
import { Row, Form } from 'react-bootstrap';
import ListingCard from '@/components/ListingCard';

interface Props {
  initialListings: ListingCardWithLike[];
  userId: number;
}

export default function ListingsClient({ initialListings, userId }: Props) {
  const [search, setSearch] = useState('');

  const filtered = initialListings.filter((item) => item.Name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search item keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      <Row xs={1} md={3} className="g-4 pt-3">
        {filtered.map((merch) => (
          <ListingCard key={merch.MerchID} merch={merch} userId={userId} />
        ))}
      </Row>
    </>
  );
}
