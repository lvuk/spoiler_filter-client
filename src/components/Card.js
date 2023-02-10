import Wrapper from '../assets/wrappers/Review';
import { FaStar, FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import SpoilerImg from './SpoilerImg';
import { useEffect, useState } from 'react';
import { remove } from '../api/reviews';
import { isAuthenticated } from '../api/auth';

const Card = (reviewData, changeReviewToUpdate) => {
  const { movie, review, grade, username, is_spoiler, id } = reviewData;
  const [showReview, setShowReview] = useState(true);

  useEffect(() => {
    is_spoiler ? setShowReview(false) : setShowReview(true);
  }, [is_spoiler]);

  const showSpoilerReview = () => {
    setShowReview(!showReview);
  };

  const handleDelete = async () => {
    const token = isAuthenticated();
    try {
      const response = await remove(id, token);
      if (response.status === 204) {
        console.log('deleted');
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {!showReview ? (
        <SpoilerImg showSpoilerReview={showSpoilerReview} />
      ) : (
        <div>
          <header>
            <div className='info'>
              <h5>{movie}</h5>
              <div>
                <p>
                  {grade} <FaStar style={{ color: 'var(--primary-yellow)' }} />
                  {' ' + username}
                </p>
              </div>
              {window.location.href ===
                `${process.env.REACT_APP_CLIENT_URL}/myreviews` && (
                <RiDeleteBin6Line
                  style={{ color: 'red', marginRight: '1rem' }}
                  onClick={handleDelete}
                />
              )}

              {window.location.href ===
                `${process.env.REACT_APP_CLIENT_URL}/myreviews` && (
                <FaEdit onClick={() => changeReviewToUpdate(reviewData)} />
              )}
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
