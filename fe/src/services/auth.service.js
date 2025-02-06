import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const whoami = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenClient);
  try {
    const response = await axios.get(`${BASE_URL}/auth/whoami`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};
