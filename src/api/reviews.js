import axios from 'axios';

export const getAll = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/reviews?per_page=6&page=1`
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllByUser = (token) => {
  try {
    const response = axios.get(
      `${process.env.REACT_APP_API_URL}/reviews/list`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
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
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const update = (reviewId, token, review) => {
  try {
    const response = axios.put(
      `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`,
      {
        ...review,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const create = async (review, token) => {
  console.log({ ...review });
  console.log(token);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/reviews`,
      {
        ...review,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // console.log(response);

    return response;
  } catch (error) {
    // console.log(error);
    return error.response;
  }
};
