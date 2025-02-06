import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const getScheedule = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/booking/scheedule`, data);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const createBooking = async (data) => {
  const token = CookiesStorage.get(CookiesKey.TokenClient);
  try {
    const response = await axios.post(`${BASE_URL}/booking`, data, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.AuthToken);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const getBookingsClient = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenClient);
  try {
    const response = await axios.get(`${BASE_URL}/booking/client`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.AuthToken);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};
