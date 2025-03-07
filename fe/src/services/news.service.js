import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';
const BASE_URL = import.meta.env.VITE_URL;

export const createNews = async (data) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenAdmin);
    const response = await axios.post(`${BASE_URL}/news`, data, {
      headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
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

export const getNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/news`);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenAdmin);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const getNewsDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/news/${id}`);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenAdmin);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const updateNews = async (id, data) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenAdmin);
    const response = await axios.put(`${BASE_URL}/news/${id}`, data, {
      headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
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

export const deleteNews = async (id) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenAdmin);
    const response = await axios.delete(`${BASE_URL}/news/${id}`, {
      headers: { Authorization: token },
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
