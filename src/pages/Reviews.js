import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';
import { getAll } from '../api/reviews';
import Wrapper from '../assets/wrappers/ReviewContainer';
import Card from '../components/Card';
import ReviewForm from '../components/ReviewForm';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const nav = useNavigate();

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
          <div style={{ display: 'flex' }}>
            <h1 style={{ marginLeft: '35%' }}>REVIEWS</h1>
            {isAuthenticated() && (
              <p
                onClick={() => nav('/myreviews')}
                style={{ marginLeft: '2rem', cursor: 'pointer' }}
              >
                Your reviews
              </p>
            )}
          </div>

          <main className='grid'>
            {reviews.map((review, i) => {
              return <Card reviewData={review} key={i} />;
            })}
          </main>
        </div>
        {
          //TO DO
          //ONLY IF USER IS LOGIN DISPLAY THIS BOCK
          isAuthenticated() && (
            <div style={{ marginTop: '10.75rem' }}>
              <ReviewForm />
            </div>
          )
        }
      </div>
    </Wrapper>
  );
};
export default Reviews;
