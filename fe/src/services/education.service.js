import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';
const BASE_URL = import.meta.env.VITE_URL;

export const getEducations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/education`);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const createEducation = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/education`, data);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const updateEducation = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/education/${id}`, data);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const deleteEducation = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/education/${id}`);
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};
