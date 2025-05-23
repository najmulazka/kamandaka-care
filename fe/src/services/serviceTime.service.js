import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const getServiceTime = async () => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenDoctor);
    const response = await axios.get(`${BASE_URL}/service-time`, {
      headers: { Authorization: token },
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

export const putServiceTime = async (id, data) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenDoctor);
    const response = await axios.put(`${BASE_URL}/service-time/${id}`, data, {
      headers: { Authorization: token },
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
