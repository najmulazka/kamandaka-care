import { useState } from 'react';
// import { LoginAdmin } from '../../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { loginDoctor } from '../../../services/auth.service';

const LoginDoctor = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isProcess, setIsProcess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsProcess(true);
    try {
      await loginDoctor(data);
      navigate('/doctor/booking');
    } catch (err) {
      setError(err.response.data.err);
    } finally {
      setIsProcess(false);
    }
  };

  return (
    <div className="relative">
      <div className="pl-6 pt-6 lg:p-4 absolute lg:px-8 rounded-md flex">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
          </svg>
        </Link>
      </div>
      <div className="h-screen flex items-center justify-center">
        <div className="border border-gray-900 lg:w-1/3 p-8 rounded-lg">
          <div className="flex justify-center">
            <img src="/logo.png" alt="" className="w-16" />
          </div>
          <div className="m-4 text-center font-semibold">LOGIN DOKTER KAMANDAKA CARE</div>
          {error !== '' && <div className="m-4 text-center text-red-500 font-semibold">{error}</div>}
          <form action="" className="flex flex-col space-y-4" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setData({ ...data, email: event.target.value });
              }}
              className="border border-gray-500 rounded-md px-2 py-1"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setData({ ...data, password: event.target.value });
              }}
              className="border border-gray-500 rounded-md px-2 py-1"
            />
            <button type="submit " className="bg-sky-500 py-1 rounded-md font-semibold hover:bg-sky-800 hover:text-white">
              {isProcess ? 'Loading...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginDoctor;
