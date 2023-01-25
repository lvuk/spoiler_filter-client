import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Alert, FormRow } from '../components';
import img from '../assets/photos/popcorn.png';
import { login } from '../api/auth';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
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
    const { email, password } = values;
    if (!email || !password) {
      const alertType = 'danger';
      const alertText = 'Please provide all credentials';
      showAlert3seconds(alertText, alertType);
    }
    const user = { email, pass: password };

    try {
      const response = await login(user);
      console.log(response);
      if (response.error) {
        showAlert3seconds(response.error, 'danger');
      } else {
        nav('/reviews');
      }
    } catch (error) {
      console.log(error);
    }

    // TO DO: send to backend and work on respoonse
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <div style={{ textAlign: 'center' }}>
          <img src={img} alt='logo' style={{ width: '50%' }} />
        </div>
        <h3>Login</h3>
        {alert.visible && <Alert {...alert} />}
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
          Not a member yet?
          <button
            type='button'
            onClick={() => nav('/register')}
            className='member-btn'
          >
            Register
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;
