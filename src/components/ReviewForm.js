import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../api/reviews';
import Wrapper from '../assets/wrappers/ReviewForm';
import Alert from './Alert';
import FormRow from './FormRow';
import { Rating } from 'react-simple-star-rating';
import { isAuthenticated } from '../api/auth';

const initialState = {
  movie: '',
  review: '',
  grade: 0,
};

const fillColorArray = [
  '#f17a45',
  '#f17a45',
  '#f19745',
  '#f19745',
  '#f1a545',
  '#f1a545',
  '#f1b345',
  '#f1b345',
  '#f1d045',
  '#f1d045',
];

const ReviewForm = () => {
  const [values, setValues] = useState(initialState);
  const nav = useNavigate();
  const [alert, setAlert] = useState({
    alertText: '',
    alertType: '',
    visible: false,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRating = (rate) => {
    setValues({ ...values, grade: rate });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { movie, review, grade } = values;
    if (!movie || !review || !grade) {
      const alertType = 'danger';
      const alertText = 'Some field is empty!';
      showAlert3seconds(alertText, alertType);
    }

    const reviewObj = { movie, review, grade, is_spoiler: false };
    const token = isAuthenticated().token;

    console.log(token);

    try {
      const response = await create(reviewObj, token);

      if (response.error) {
        showAlert3seconds(response.error, 'danger');
      } else {
        showAlert3seconds('Review posted!', 'success');
        setTimeout(() => {
          nav('/reviews');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert3seconds = (alertText, alertType) => {
    setAlert({ alertText, alertType, visible: true });
    setTimeout(() => {
      setAlert({
        alertText: '',
        alertType: '',
        visible: false,
      });
    }, 3000);
    return;
  };

  return (
    <Wrapper className='review-form'>
      <form className='form' onSubmit={onSubmit}>
        <h3>Write a review</h3>
        {alert.visible && <Alert {...alert} />}
        {/* film input */}
        <FormRow
          type='text'
          name='movie'
          value={values.movie}
          handleChange={handleChange}
        />
        {/* review input  */}
        <div className='form-row'>
          <label htmlFor='review' className='form-label'>
            Review
          </label>
          <textarea
            name='review'
            cols={40}
            rows={10}
            className='form-textarea'
            value={values.review}
            onChange={handleChange}
          />
        </div>
        <label htmlFor='rating' className='form-label'>
          Rating
        </label>
        <div>
          <Rating
            onClick={handleRating}
            size={40}
            transition
            fillColorArray={fillColorArray}
          />
        </div>

        <button type='submit' className='btn btn-block'>
          {' '}
          submit
        </button>
      </form>
    </Wrapper>
  );
};
export default ReviewForm;
