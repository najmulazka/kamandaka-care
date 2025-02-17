import { useEffect, useState } from 'react';
import { getBookingsDoctor } from '../../../services/booking.service';
import { useNavigate } from 'react-router-dom';
import HeaderDoctor from '../../fragments/HeaderDoctor';

const BookingDoctor = () => {
  const navigate = useNavigate();
  const [bookingsDoctor, setBookingsDoctor] = useState({});
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingsDoctor();
        setBookingsDoctor(data);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-doctor');
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <HeaderDoctor />
      <div className="p-6 px-8 lg:justify-center lg:flex">
        <table className="border-collapse border border-gray-400">
          <thead className="bg-sky-300">
            <tr>
              <th className="border border-gray-400 text-left p-2">No</th>
              <th className="border border-gray-400 w-64 text-left p-2">Nama</th>
              <th className="border border-gray-400 w-64 text-left p-2">Email</th>
              <th className="border border-gray-400 w-48 text-left p-2">Jenis Layanan</th>
              <th className="border border-gray-400 w-48 text-left p-2">Tanggal</th>
              <th className="border border-gray-400 w-48 text-left p-2">Zoom</th>
            </tr>
          </thead>
          <tbody>
            {bookingsDoctor.length > 0 &&
              bookingsDoctor.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-400 p-1">{index++}</td>
                  <td className="border border-gray-400 p-1">{item.clients.fullName}</td>
                  <td className="border border-gray-400 p-1">{item.clients.email}</td>
                  <td className="border border-gray-400 p-1">{item.services.serviceName}</td>
                  <td className="border border-gray-400 p-1">{item.dateTime}</td>
                  <td className="border border-gray-400 p-1 font-semibold text-sky-500">
                    <a href={item.linkHost}>Link</a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDoctor;
