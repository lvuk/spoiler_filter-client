import Wrapper from '../assets/wrappers/Review';
import { FaStar } from 'react-icons/fa';

const Card = (reviewData) => {
  const { movie, review, grade, user_id } = reviewData;
  let is_spoiler = false;
  return (
    <Wrapper>
      {is_spoiler ? (
        <h1>SPOILER</h1>
      ) : (
        <div>
          <header>
            <div className='info'>
              <h5>{movie}</h5>
              <div>
                <p>
                  {grade} <FaStar style={{ color: 'var(--primary-yellow)' }} />
                </p>
              </div>
            </div>
          </header>
          <div className='content'>
            <p>{review}</p>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
export default Card;
