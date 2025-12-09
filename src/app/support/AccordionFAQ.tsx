'use client';

import { Accordion } from 'react-bootstrap';

const AccordionFAQ = () => (
  <Accordion>
    <Accordion.Item eventKey="0">
      <Accordion.Header>Why can I not sell items?</Accordion.Header>
      <Accordion.Body>
        You should check if you are signed in first at the top right corner.
        It should state your username if you are signed in.
        To ensure safety and security of all users, you must be signed in to sell items.
      </Accordion.Body>
    </Accordion.Item>

    <Accordion.Item eventKey="1">
      <Accordion.Header>Why can I not sign in?</Accordion.Header>
      <Accordion.Body>
        There can be many reasons as to why this may be the case.
        First, check if you typed your username/email or password correctly.
        If you are sure that you have, you can contact us below for more clarification.
        Also be sure to double check your email to see if your account was banned for false
        listings, purchases, etc.
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2">
      <Accordion.Header>When I like an item, why does the like count go to 0?</Accordion.Header>
      <Accordion.Body>
        The item count has to update to reflect the change in likes.
        Please refresh the page to see the updated like count!
        If there are still issues, feel free to contact us below.
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3">
      <Accordion.Header>
        I had an item I was interested in... Why does it not show up in favorited listings anymore?
      </Accordion.Header>
      <Accordion.Body>
        If an item you favorited is no longer available, it may have been sold or recalled by the seller.
        It may also have been removed due to violations of our marketplace policies or as a result of the
        seller removing their account. To ensure a safe and reliable marketplace, sold or recalled items
        are removed from all listings.
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
);

export default AccordionFAQ;
