import { useEffect, useState } from 'react';
import { isAuthenticated } from '../api/auth';
import { getAllByUser } from '../api/reviews';
import Wrapper from '../assets/wrappers/ReviewContainer';
import Card from '../components/Card';
import UpdateForm from '../components/UpdateFrom';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewToUpdate, setReviewToUpdate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = isAuthenticated();
      const response = await getAllByUser(token);
      setReviews(response.data);
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <div
        className='container'
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <div
          className='container'
          style={{ marginTop: '5rem', alignItems: 'center' }}
        >
          <div>
            <h1 style={{ marginLeft: '35%' }}>your reviews</h1>
          </div>

          <main className='grid'>
            {reviews.map((review, i) => {
              return (
                <Card
                  {...review}
                  key={i}
                  changeReviewToUpdate={(review) => setReviewToUpdate(review)}
                />
              );
            })}
          </main>
        </div>
        {
          <div style={{ marginTop: '10.75rem' }}>
            <UpdateForm reviewObj={reviewToUpdate} />
          </div>
        }
      </div>
    </Wrapper>
  );
};
export default UserReviews;
