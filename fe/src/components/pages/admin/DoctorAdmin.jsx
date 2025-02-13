import { useEffect, useState } from 'react';
import HeaderAdmin from '../../fragments/HeaderAdmin';
import { getDoctors } from '../../../services/doctor.service';
import { useNavigate } from 'react-router-dom';

const DoctorAdmin = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState({});
  console.log(doctors);
  let index = 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <HeaderAdmin />
      <div className="flex flex-col items-center p-6 px-8">
        <div className="font-semibold text-gray-900 mb-6 text-xl">MANAGE DOCTOR</div>
        <div className="w-full text-right">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Tambah +
          </button>
        </div>
        <table className="border-collapse border border-gray-400 w-full">
          <thead className="bg-sky-300">
            <tr>
              <th className="border border-gray-400 w-5 text-left p-2">No</th>
              <th className="border border-gray-400 text-left p-2">Nama Lengkap</th>
              <th className="border border-gray-400 text-left p-2">Email</th>
              <th className="border border-gray-400 text-left p-2">Specialist</th>
              <th className="border border-gray-400 text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 &&
              doctors.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-400 p-1">{index++}</td>
                  <td className="border border-gray-400 p-1">{item.fullName}</td>
                  <td className="border border-gray-400 p-1">{item.email}</td>
                  <td className="border border-gray-400 p-1">{item.specialist}</td>
                  <td className="border border-gray-400 w-48 p-1">
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      Edit
                    </button>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAdmin;
