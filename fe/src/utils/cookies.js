import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const CookiesKey = {
  TokenClient: 'TokenClient',
  Client: 'Client',
  TokenAdmin: 'TokenAdmin',
  Admin: 'Admin',
  TokenDoctor: 'TokenDoctor',
  Doctor: 'Doctor',
};

const CookiesOptions = {
  path: '/',
  secure: true,
  // maxAge: 24 * 60 * 60,
};

export const CookiesStorage = {
  set: (key, data, options) => {
    return cookies.set(key, data, { ...CookiesOptions, ...options });
  },
  get: (key, options) => {
    return cookies.get(key, { ...CookiesOptions, ...options });
  },
  remove: (key, options) => {
    return cookies.remove(key, { ...CookiesOptions, ...options });
  },
};
