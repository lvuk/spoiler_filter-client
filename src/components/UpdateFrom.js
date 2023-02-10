import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { update } from '../api/reviews';
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

const UpdateForm = ({ reviewObj }) => {
  const [values, setValues] = useState(initialState);
  const nav = useNavigate();
  const [alert, setAlert] = useState({
    alertText: '',
    alertType: '',
    visible: false,
  });

  useEffect(() => {
    console.log(reviewObj);
    if (JSON.stringify(reviewObj) !== '{}') {
      const { movie, review, grade } = reviewObj;
      values.movie = movie;
      values.review = review;
      values.grade = grade;
    } else {
      setValues(initialState);
    }
  }, [reviewObj]);

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

    const updatedReview = { movie, review, grade };
    const token = isAuthenticated();

    console.log(updatedReview);

    try {
      const response = await update(reviewObj.id, token, updatedReview);
      console.log(response);

      if (response.status !== 201) {
        showAlert3seconds(response.data, 'danger');
      } else {
        showAlert3seconds('Review updated!', 'success');
        window.location.reload();
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
        <h3>Edit review</h3>
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
export default UpdateForm;
