import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow } from '../components';
import img from '../assets/photos/popcorn.png';
import { register } from '../api/auth';

const initialState = {
  username: '',
  email: '',
  password: '',
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const [alert, setAlert] = useState({
    alertText: '',
    alertType: '',
    visible: false,
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = values;
    if (!email || !password || !username) {
      const alertType = 'danger';
      const alertText = 'Please provide all credentials';
      showAlert3seconds(alertText, alertType);
    }
    const user = { username, email, pass: password };

    try {
      const response = await register(user);
      if (response.error) {
        showAlert3seconds(response.error, 'danger');
      } else {
        showAlert3seconds('Successfully registered. Enjoy!', 'success');
        setTimeout(() => {
          nav('/login');
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <div style={{ textAlign: 'center' }}>
          <img src={img} alt='logo' style={{ width: '50%' }} />
        </div>
        <h3>Register</h3>
        {alert.visible && <Alert {...alert} />}
        {/* username input */}

        <FormRow
          type='text'
          name='username'
          value={values.name}
          handleChange={handleChange}
        />
        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          {' '}
          submit
        </button>
        <p>
          Already a member?
          <button
            type='button'
            onClick={() => nav('/login')}
            className='member-btn'
          >
            Login
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
