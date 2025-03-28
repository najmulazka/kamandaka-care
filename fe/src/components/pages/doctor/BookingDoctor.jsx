import { useEffect, useState } from 'react';
import { getBookingsDoctor } from '../../../services/booking.service';
import { useNavigate } from 'react-router-dom';
import HeaderDoctor from '../../fragments/HeaderDoctor';
import { toast } from 'react-toastify';

const BookingDoctor = () => {
  const navigate = useNavigate();
  const [bookingsDoctor, setBookingsDoctor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getBookingsDoctor();
        setBookingsDoctor(data);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/login-doctor');
        } else if (err.status == 400) {
          toast.warn(err.response.data.err);
        } else if (err.status == 500) {
          toast.error('Aplikasi Error Silahkan Hubungi Developer');
        } else {
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <HeaderDoctor />
      <div className="p-6 px-8 lg:justify-center lg:flex flex-col">
        <div className="font-semibold text-xl text-center mb-4">DATA BOOKING KONSULTASI</div>
        {isLoading ? (
          'Loading...'
        ) : (
          <table className="border-collapse border border-gray-400">
            <thead className="bg-sky-300">
              <tr>
                <th className="border border-gray-400 text-left p-2">No</th>
                <th className="border border-gray-400 w-64 text-left p-2">Nama</th>
                <th className="border border-gray-400 w-64 text-left p-2">Email</th>
                <th className="border border-gray-400 w-48 text-left p-2">Jenis Layanan</th>
                <th className="border border-gray-400 w-48 text-left p-2">Tanggal Booking</th>
                <th className="border border-gray-400 w-48 text-left p-2">Tanggal Konsultasi</th>
                <th className="border border-gray-400 w-48 text-left p-2">Meet</th>
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
                    <td className="border border-gray-400 p-1">{item.createdAt}</td>
                    <td className="border border-gray-400 p-1">{item.dateTime}</td>
                    <td className="border border-gray-400 p-1 font-semibold text-sky-500 hover:text-sky-700">
                      <a href={item.linkHost}>Link</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {bookingsDoctor.length == 0 && <div className="text-center mt-2">Belum Terdapat Data Booking</div>}
      </div>
    </div>
  );
};

export default BookingDoctor;
