import { useEffect, useState } from 'react';
import { getAll } from '../api/reviews';
import Wrapper from '../assets/wrappers/ReviewContainer';
import Card from '../components/Card';
import ReviewForm from '../components/ReviewForm';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAll();
      console.log(response.data);
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
            <h1 style={{ marginLeft: '35%' }}>REVIEWS</h1>
          </div>

          <main className='grid'>
            {reviews.map((review, i) => {
              return <Card {...review} key={i} />;
            })}
          </main>
        </div>
        <div style={{ marginTop: '10.75rem' }}>
          <ReviewForm />
        </div>
      </div>
    </Wrapper>
  );
};
export default Reviews;
