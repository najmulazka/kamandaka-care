import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const getServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/service`);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const createService = async (data) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenAdmin);
    const response = await axios.post(`${BASE_URL}/service`, data, {
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

export const updateService = async (id, data) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenAdmin);
    const response = await axios.put(`${BASE_URL}/service/${id}`, data, {
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

export const deleteService = async (id) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenAdmin);
    const response = await axios.delete(`${BASE_URL}/service/${id}`, {
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
