import { useEffect, useState } from 'react';
import HeaderClient from '../fragments/HeaderClient';
import { useNavigate } from 'react-router-dom';
import { getBookingsClient } from '../../services/booking.service';

const OrderHistory = () => {
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

  console.log(data);
  return (
    <div>
      <HeaderClient />
      <div>
        <table className="border-separate border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300">No</th>
              <th className="border border-gray-300">Jenis Layanan</th>
              <th className="border border-gray-300">Tanggal</th>
              <th className="border border-gray-300">Status</th>
              <th className="border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300">{index++}</td>
                  <td className="border border-gray-300">{item.services.serviceName}</td>
                  <td className="border border-gray-300">{item.dateTime}</td>
                  <td className="border border-gray-300">{item.isValidate === null ? 'Menunggu pembayaran' : item.isValidate === true ? 'Sudah bayar' : 'Belum bayar'}</td>
                  <td className="border border-gray-300">
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

export default OrderHistory;
