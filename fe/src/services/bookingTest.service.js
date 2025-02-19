import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const createBookingTest = async (data) => {
  const token = CookiesStorage.get(CookiesKey.TokenClient);
  try {
    const response = await axios.post(`${BASE_URL}/booking-test`, data, {
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

export const validateBookingTest = async (id, data) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);
  try {
    const response = await axios.put(`${BASE_URL}/booking-test/${id}`, data, {
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

export const getBookingTestClient = async () => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenClient);
    const response = await axios.get(`${BASE_URL}/booking-test/client`, { headers: { Authorization: token } });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const getBookingTestDoctor = async () => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenDoctor);
    const response = await axios.get(`${BASE_URL}/booking-test/doctor`, { headers: { Authorization: token } });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenDoctor);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const getBookingTestAnswer = async (id) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenDoctor);
    const response = await axios.get(`${BASE_URL}/booking-test/answer/${id}`, {
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

export const updateBookingTestResult = async (id, data) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenDoctor);
    const response = await axios.put(`${BASE_URL}/booking-test/result/${id}`, data, {
      headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
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

export const getBookingTest = async () => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenAdmin);
    const response = await axios.get(`${BASE_URL}/booking-test`, {
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
