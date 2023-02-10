import axios from 'axios';

export const register = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/register`,
      { ...user }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      {
        ...user,
      }
    );
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ ...user }),
    // });

    console.log(response);
    localStorage.clear();
    localStorage.setItem('jwt', 'Bearer ' + response.headers.jwt);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') return false;
  if (localStorage.getItem('jwt')) {
    return localStorage.getItem('jwt');
  } else {
    return false;
  }
};
