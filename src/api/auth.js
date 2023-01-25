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
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
