'use client';

import { useState, useEffect } from 'react';
import { Row, Form, Button, Col } from 'react-bootstrap';
import MerchSlip from '@/components/MerchSlip';
import type { Merch, LikedMerch } from '@prisma/client';

type MerchWithLikes = Merch & {
  likedBy: LikedMerch[];
};

interface Props {
  initialListings: MerchWithLikes[];
}

export default function ListingsClient({ initialListings }: Props) {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [search]);

  const filtered = initialListings.filter((item) => (item.Name ?? '').toLowerCase().includes(search.toLowerCase()));

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (pageNumber - 1) * itemsPerPage;

  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

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

      {paginatedItems.map((merch) => (
        <Row key={merch.MerchID} className="mb-4">
          <Col>
            <MerchSlip merch={merch as any} usage="admin" />
          </Col>
        </Row>
      ))}

      <div className="d-flex justify-content-center align-items-center mt-4">
        <Button
          onClick={() => setPageNumber((p) => p - 1)}
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
          onClick={() => setPageNumber((p) => p + 1)}
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
