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
  </Accordion>
);

export default AccordionFAQ;
