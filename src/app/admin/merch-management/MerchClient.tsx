'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import MerchSlip from '@/components/MerchSlip';

export default function MerchClient() {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Reset page when search changes
    setPageNumber(1);
  }, [search]);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `/api/merch?search=${encodeURIComponent(search)}&page=${pageNumber}&perPage=5`,
        { cache: 'no-store' },
      );
      const data = await res.json();
      setItems(data.merch);
      setTotalPages(data.totalPages);
    }

    load();
  }, [search, pageNumber]);

  return (
    <>
      <Form className="mb-3">
        <Form.Control
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </Form>

      {items.map((m: any) => (
        <Row key={m.MerchID}>
          <Col className="mb-3">
            <MerchSlip merch={m} usage="admin" />
          </Col>
        </Row>
      ))}

      <div className="mt-3">
        <Button disabled={pageNumber === 1} onClick={() => setPageNumber(p => p - 1)}>
          Prev
        </Button>

        <span className="px-3">
          Page
          {' '}
          {totalPages === 0 ? 0 : pageNumber}
          {' '}
          of
          {' '}
          {totalPages}
        </span>

        <Button disabled={pageNumber === totalPages} onClick={() => setPageNumber(p => p + 1)}>
          Next
        </Button>
      </div>
    </>
  );
}
