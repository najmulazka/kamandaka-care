import { useEffect, useState } from 'react';
import HeaderClient from '../fragments/HeaderClient';
import { useNavigate } from 'react-router-dom';
import { getBookingsClient } from '../../services/booking.service';

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
          navigate('/');
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <HeaderClient />
      <div className="p-8 px-8 align-center flex justify-center">
        <table className="border-collapse border border-gray-400">
          <thead className="bg-sky-300">
            <tr>
              <th className="border border-gray-400 text-left p-2">No</th>
              <th className="border border-gray-400 w-64 text-left p-2">Jenis Layanan</th>
              <th className="border border-gray-400 w-64 text-left p-2">Tanggal</th>
              <th className="border border-gray-400 w-48 text-left p-2">Status</th>
              <th className="border border-gray-400 w-20 text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-400 p-1">{index++}</td>
                  <td className="border border-gray-400 p-1">{item.services.serviceName}</td>
                  <td className="border border-gray-400 p-1">{item.dateTime}</td>
                  <td className="border border-gray-400 p-1">{item.isValidate === null ? 'Menunggu pembayaran' : item.isValidate === true ? 'Sudah bayar' : 'Belum bayar'}</td>
                  <td className="border border-gray-400 p-1 font-semibold text-sky-500">
                    <a href={`${item.linkClient === null ? 'payment' : item.linkClient}`}>{item.linkClient === null ? 'Cek' : 'Zoom'}</a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryKonsultasi;
