import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const getScheedule = async (data) => {
  try {
    const token = CookiesStorage.get(CookiesKey.TokenClient);
    const response = await axios.post(`${BASE_URL}/booking/scheedule`, data, {
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

export const createBooking = async (data) => {
  const token = CookiesStorage.get(CookiesKey.TokenClient);
  try {
    const response = await axios.post(`${BASE_URL}/booking`, data, {
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

export const createMeet = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenClient);
  try {
    const response = await axios.post(`http://localhost:3000/create-event`, {
      headers: {
        Authorization: token,
      },
    });

    console.log(response);

    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenClient);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const createBookingOffline = async (data) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);
  try {
    const response = await axios.post(`${BASE_URL}/booking/offline`, data, {
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

export const validateBooking = async (id, data) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);
  try {
    const response = await axios.put(`${BASE_URL}/booking/${id}`, data, {
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

export const getBooking = async (queryParams = {}) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    console.log(queryString);

    const response = await axios.get(`${BASE_URL}/booking${queryString ? `?${queryString}` : ''}`, {
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

export const getBookingsClient = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenClient);
  try {
    const response = await axios.get(`${BASE_URL}/booking/client`, {
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

export const getBookingsDoctor = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenDoctor);
  try {
    const response = await axios.get(`${BASE_URL}/booking/doctor`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenDoctor);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};
