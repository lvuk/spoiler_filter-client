import main from '../assets/photos/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <div className='container page'>
        <div className='info'>
          <h1>
            <span>Review</span>.me
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
          <Link
            to='/reviews'
            className='btn btn-hero'
            style={{ marginLeft: '1rem' }}
          >
            Go to reviews
          </Link>
        </div>
        <img src={main} alt='move time' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
