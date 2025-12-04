'use client';

import { useState, useEffect } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import ListingCard from '@/components/ListingCard';
import type { ListingCardData } from '@/lib/ListingCardData';

type ListingCardWithLike = ListingCardData & { isLiked?: boolean };

interface Props {
  initialListings: ListingCardWithLike[];
  userId: number;
}

export default function ListingsClient({ initialListings, userId }: Props) {
  const [search, setSearch] = useState('');
  const [listings] = useState(initialListings);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [search]);

  const filtered = listings.filter((item) => item.Name.toLowerCase().includes(search.toLowerCase()));

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = filtered.slice(startIndex, endIndex);

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
        {paginatedItems.map((merch) => (
          <ListingCard
            key={merch.MerchID}
            merch={merch}
            userId={userId}
          />
        ))}
      </Row>
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Button
          onClick={pageNumber > 1 ? () => { setPageNumber(pageNumber - 1); } : undefined}
          disabled={pageNumber === 1}
          variant="success"
          className="me-3"
        >
          Previous
        </Button>

        <span>
          Page
          {' '}
          {pageNumber}
          {' '}
          of
          {' '}
          {totalPages}
        </span>

        <Button
          onClick={pageNumber < totalPages ? () => { setPageNumber(pageNumber + 1); } : undefined}
          disabled={pageNumber === totalPages}
          variant="success"
          className="ms-3"
        >
          Next
        </Button>
      </div>
    </>
  );
}
