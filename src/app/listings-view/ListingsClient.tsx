'use client';

import { useState, useRef, useEffect } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import ListingCard from '@/components/ListingCard';

export default function ListingsClient({ userId }: { userId: number }) {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const wordBank = [
    '(„• ᴗ •„) Search something!',
    '(　-_･) ︻デ═一 ▸ What\'s your target?',
    '(⸝⸝⸝O﹏ O⸝⸝⸝) What\'s here today?',
    '(⸝⸝> ᴗ•⸝⸝) Good luck searching!',
    '<(￣︶￣)> What\'s the plan?',
    'ヽ(・∀・)ﾉ Aloha! What to find?',
    '(///▽///) Searching something hot?',
    '(×﹏×) RIP me, search bar.',
    '(⊃｡•́‿•̀｡)⊃ Hug what you like.',
    '(‾́。‾́ )y~~ No cigars on sale.',
  ];
  const searchbarPlaceholder = useRef<string>(wordBank[Math.floor(Math.random() * wordBank.length)]);

  // Reset page on search change
  useEffect(() => {
    setPageNumber(1);
  }, [search]);

  // Fetch from API
  useEffect(() => {
    async function load() {
      const res = await fetch(
        `/api/listings?search=${encodeURIComponent(search)}&page=${pageNumber}&perPage=12`,
        { cache: 'no-store' },
      );
      const data = await res.json();
      setItems(data.items);
      setTotalPages(data.totalPages);
    }

    load();
  }, [search, pageNumber]);

  return (
    <>
      <Form.Group controlId="search" className="mb-3">
        <Form.Control
          type="text"
          placeholder={searchbarPlaceholder.current}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>

      <Row xs={1} md={3} className="g-4 pt-5 d-flex">
        {items.map((merch) => (
          <ListingCard key={merch.MerchID} merch={merch} userId={userId} />
        ))}
      </Row>

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
          {totalPages === 0 ? 0 : pageNumber}
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
