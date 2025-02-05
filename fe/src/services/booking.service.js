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
