'use client';

import Image from 'react-bootstrap/Image';

const TwoByTwoFlex: React.FC = () => (
  <div className="flex-grid">
    <div className="box text-center border-end border-bottom">
      <h1>Hello!</h1>
      <a href="/auth/signin" className="btn btn-primary mt-3" role="button">Log In</a>
      <a href="/auth/signup" className="btn btn-primary mt-3" role="button">Sign Up</a>
      <Image src="sunset-wonkes.png" alt="Wonkes logo" width="400px" />
    </div>
    <div className="box text-center border-end border-bottom">
      Item2
    </div>
    <div className="box">Item 3</div>
    <div className="box">Item 4</div>
  </div>
);

export default TwoByTwoFlex;
