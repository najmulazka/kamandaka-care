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

export const whoDoctor = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenDoctor);
  try {
    const response = await axios.get(`${BASE_URL}/auth/who-doctor`, {
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

export const loginAdmin = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login-admin`, data);
    CookiesStorage.set(CookiesKey.TokenAdmin, response.data.data.token);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const loginDoctor = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login-doctor`, data);
    CookiesStorage.set(CookiesKey.TokenDoctor, response.data.data.token);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};
