import { useState } from 'react';
import { loginAdmin } from '../../../services/auth.service';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginAdmin(data);
      navigate('/admin');
    } catch (err) {
      setError(err.response.data.err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border border-gray-900 lg:w-1/3 p-8 rounded-lg">
        <div className="flex justify-center">
          <img src="/logo.png" alt="" className="w-16" />
        </div>
        <div className="m-4 text-center font-semibold">LOGIN ADMIN KAMANDAKA CARE</div>
        {error !== '' && <div className="m-4 text-center text-red-500 font-semibold">{error}</div>}
        <form action="" className="flex flex-col space-y-4" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setData({ ...data, username: event.target.value });
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
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
