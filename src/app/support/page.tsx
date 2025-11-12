import { Container } from 'react-bootstrap';

/** Render a list of stuff for the logged in user. */
const SupportPage = async () => (
  <main>
    <Container id="support" className="p-3">
      <h1>Support</h1>
      <h2>Webpage Info</h2>
      <p>TBD</p>
      <h2>FAQ</h2>
      <p>
        Q: Why can I not sell items?
        <br />
        A: You should check if you are signed in first at the top right corner.
        It should state your username if you are signed in.
        To ensure saftey and securiy of all users, you must be signed in to sell items.
      </p>
      <p>
        Q: Why can I not sign in?
        <br />
        A: There can be many reasons as to why this may be the case.
        First, check if you typed your username/email or password correctly.
        If you are sure that you have, you can contact us below for more clarification.
        Also be sure to double check your email to see if your account was banned for false
        listings, purchases, etc.
      </p>
      <p>
        For more information, click
        {' '}
        <a href="https://wonkes-manoa.github.io/" target="_blank" rel="noreferrer">here</a>
      </p>

      <h2>Contact us</h2>
      <p>
        Have a question? Feel free to email myemail@foo or call us at (808)111-1111
        for more information!
      </p>

    </Container>
  </main>
);

export default SupportPage;
