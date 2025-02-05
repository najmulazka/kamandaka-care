import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';
// import { getSelfCheckProfessions } from '../../services/selfCheckProfession.service';

function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          CookiesStorage.set(CookiesKey.TokenClient, token);
          navigate('/client');
        } else if (!CookiesStorage.get(CookiesKey.TokenClient)) {
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [navigate]);

  return <div>loading...</div>;
}

export default CallbackPage;
