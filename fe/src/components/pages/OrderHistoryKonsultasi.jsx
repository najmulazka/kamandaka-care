import { useEffect, useState } from 'react';
import HeaderClient from '../fragments/HeaderClient';
import { Link, useNavigate } from 'react-router-dom';
import { getBookingsClient } from '../../services/booking.service';
import { toast } from 'react-toastify';

const OrderHistoryKonsultasi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getBookingsClient();
        setData(response);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/');
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
      <HeaderClient />
      <div className="p-8 px-8 align-center lg:flex flex-col justify-center print:hidden">
        <div className="font-semibold text-xl text-center mb-4">RIWAYAT BOOKING KONSULTASI</div>
        {isLoading ? (
          'Loading...'
        ) : (
          <>
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
                        <td className="border border-gray-400 text-center p-1 font-semibold text-[#29ADB2] hover:text-[#21878b]">
                          <Link
                            to={`${item.isValidate === null ? `payment/${item.id}` : !item.isValidate ? '' : item.linkClient ? item.linkClient : ''}`}
                            target={`${item.isValidate === null ? `_parent` : !item.isValidate ? '' : item.linkClient ? '_blank' : '_parent'}`}>
                            {`${item.isValidate === null ? `Cek` : !item.isValidate ? 'Invalid' : item.linkClient ? 'Meet' : ''}`}
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}

            {data.length == 0 && <div>Belum terdapat riwayat booking konsultasi</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryKonsultasi;
