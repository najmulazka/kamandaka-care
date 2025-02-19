import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';
const BASE_URL = import.meta.env.VITE_URL;

const token = CookiesStorage.get(CookiesKey.TokenAdmin);
export const getTestTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/test-type`);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const createTestType = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/test-type`, data, {
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

export const updateTestType = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/test-type/${id}`, data, {
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

export const deleteTestType = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/test-type/${id}`, {
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
