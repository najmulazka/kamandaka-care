import { useEffect, useState } from 'react';
import HeaderClient from '../fragments/HeaderClient';
import { useNavigate } from 'react-router-dom';
import { getBookingsClient } from '../../services/booking.service';
import { toast } from 'react-toastify';

const OrderHistoryKonsultasi = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBookingsClient();
        setData(response);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/');
        }
        if (err.status == 400) {
          toast.warn(err.response.data.err);
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <HeaderClient />
      <div className="p-8 px-8 align-center lg:flex flex-col justify-center">
        <div className="font-semibold text-xl text-center mb-4">RIWAYAT BOOKING KONSULTASI</div>

        {data.length > 0 && (
          <table className="border-collapse border border-gray-400">
            <thead className="bg-[#29ADB2]">
              <tr>
                <th className="border border-gray-400 w-12 text-center p-2">No</th>
                <th className="border border-gray-400 w-64 text-center p-2">Jenis Layanan</th>
                <th className="border border-gray-400 w-64 text-center p-2">Tanggal Booking</th>
                <th className="border border-gray-400 w-64 text-center p-2">Tanggal Konsultasi</th>
                <th className="border border-gray-400 w-48 text-center p-2">Status</th>
                <th className="border border-gray-400 w-20 text-center p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-400 text-center p-1">{index++}</td>
                    <td className="border border-gray-400 text-center p-1">{item.services.serviceName}</td>
                    <td className="border border-gray-400 text-center p-1">{item.createdAt}</td>
                    <td className="border border-gray-400 text-center p-1">{item.dateTime}</td>
                    <td className="border border-gray-400 text-center p-1">{item.isValidate === null ? 'Menunggu pembayaran' : item.isValidate === true ? 'Sudah bayar' : 'Belum bayar'}</td>
                    <td className="border border-gray-400 text-center p-1 font-semibold text-[#29ADB2] hover:text-[#BBE2EC]">
                      <a href={`${item.linkClient === null ? 'payment' : item.linkClient}`} target={`${item.linkClient === null ? '_parent' : '_blank'}`}>
                        {item.linkClient === null ? 'Cek' : 'Zoom'}
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {data.length == 0 && <div>Belum terdapat riwayat booking konsultasi</div>}
      </div>
    </div>
  );
};

export default OrderHistoryKonsultasi;
