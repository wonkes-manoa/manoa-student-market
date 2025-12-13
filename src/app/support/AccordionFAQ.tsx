'use client';

import { Accordion } from 'react-bootstrap';

const faq = [
  {
    question: 'What is Wonkes?',
    answer: 'Please read above.',
  },
  {
    question: 'Who can use Wonkes?',
    answer: 'Only UH students with a valid @hawaii.edu email address can use Wonkes.',
  },
  {
    question: 'Do I have to sign in to view listings?',
    answer: `Yes, you have to sign in to view listings. This is because we want
             to protect our sellers and buyers from unidentified people, so we
             decide to require every user to sign in before they can view listings
             as well as performing most of the other actions.`,
  },
  {
    question: 'May I sign up with false information?',
    answer: 'We suggest not, because you need them genuine when someone contact you.',
  },
  {
    question: 'What am I allowed to sell?',
    answer: `You may sell common school supplies and furnitures like rulers and pillows.
             Dangerous or restricted items like weapons and poisons are not allowed.`,
  },
  {
    question: 'Will transactions made online or in-person?',
    answer: 'You will contact and meet sellers or buyers in-person to make transaction.',
  },
  {
    question: 'What is Wonkes\'s role in a transaction?',
    answer: `Wonkes only provides a platform to connect buyers and sellers.
             Wonkes does not participate or responsible for anything in a transaction.
             You will contact and meet sellers or buyers all by yourself.`,
  },
  {
    question: 'I favorited an item I interested, but why did it disappeared?',
    answer: `The item may have been sold, removed by the seller, or taken down
             for violating our policies. It may also disappear if the seller deletes
             their account.`,
  },
  {
    question: 'How do I report a problem or ask for help?',
    answer: 'Please send us your request with the contact information below.',
  },
];

const AccordionFAQ = () => (
  <Accordion>
    {
      faq.map((qna, index) => (
        <Accordion.Item eventKey={String(index)}>
          <Accordion.Header>
            {qna.question}
          </Accordion.Header>
          <Accordion.Body className="ms-3">
            {qna.answer}
          </Accordion.Body>
        </Accordion.Item>
      ))
    }
  </Accordion>
);

export default AccordionFAQ;
