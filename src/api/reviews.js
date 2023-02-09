import axios from 'axios';

export const getAll = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/reviews`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllByUser = (userId, token) => {
  try {
    const response = axios.delete(
      `${process.env.REACT_APP_API_URL}/reviews/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const remove = (reviewId, token) => {
  try {
    const response = axios.delete(
      `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const update = (reviewId, token, review) => {
  try {
    const response = axios.put(
      `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`,
      {
        review,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const create = async (review, token) => {
  console.log({ ...review });
  console.log(`Bearer ${token}`);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/reviews`,
      {
        ...review,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
