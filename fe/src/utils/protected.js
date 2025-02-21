import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookiesKey, CookiesStorage } from './cookies';
import { toast } from 'react-toastify';

export const Protected = ({ children }) => {
  const [FirstLoad, setFirstLoad] = useState(false);
  const navigate = useNavigate();
  const tokenAdmin = CookiesStorage.get(CookiesKey.TokenAdmin);

  useEffect(() => {
    if (tokenAdmin == undefined) {
      setFirstLoad(true);
    }
  }, []);

  useEffect(() => {
    if (FirstLoad) {
      toast.warn('Please Login Now');
      navigate('/login-admin');
    }
  }, [FirstLoad]);

  return children;
};

export const ProtectedClient = ({ children }) => {
  const [FirstLoad, setFirstLoad] = useState(false);
  const navigate = useNavigate();
  const tokenClient = CookiesStorage.get(CookiesKey.TokenClient);

  useEffect(() => {
    if (tokenClient == undefined) {
      setFirstLoad(true);
    }
  }, []);

  useEffect(() => {
    if (FirstLoad) {
      toast.warn('Please Login Now');
      navigate('/');
    }
  }, [FirstLoad]);

  return children;
};

export const ProtectedDoctor = ({ children }) => {
  const [FirstLoad, setFirstLoad] = useState(false);
  const navigate = useNavigate();
  const tokenClient = CookiesStorage.get(CookiesKey.TokenClient);

  useEffect(() => {
    if (tokenClient == undefined) {
      setFirstLoad(true);
    }
  }, []);

  useEffect(() => {
    if (FirstLoad) {
      toast.warn('Please Login Now');
      navigate('/login-doctor');
    }
  }, [FirstLoad]);

  return children;
};
