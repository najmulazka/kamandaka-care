import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const  BASE_URL = import.meta.env.VITE_URL;

export const getDoctors = async () => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenDoctor);
    const response = await axios.get(`${BASE_URL}/doctor`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenAdmin);
      throw new Error('Unauthorized: Token is invalid');
    }

    throw error;
  }
};
