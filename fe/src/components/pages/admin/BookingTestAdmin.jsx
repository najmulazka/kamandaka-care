import { useEffect, useState } from 'react';
import HeaderAdmin from '../../fragments/HeaderAdmin';
import { useNavigate } from 'react-router-dom';
import { getBookingTest, validateBookingTest } from '../../../services/bookingTest.service';

const BookingTestAdmin = () => {
  const navigate = useNavigate();
  const [bookingTests, setBookingTests] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getBookingTest();
        setBookingTests(data);
        setIsLoading(false);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    };
    fetchData();
  }, [refresh, navigate]);

  const handleValidate = async (id, data) => {
    try {
      setIsProcess(true);
      await validateBookingTest(id, data);
      setRefresh(!refresh);
      setIsProcess(false);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login-admin');
      }
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="p-6 px-8 lg:justify-center lg:flex">
        {isLoading ? (
          'Loading...'
        ) : (
          <table className="border-collapse border border-gray-400">
            <thead className="bg-sky-300">
              <tr>
                <th className="border border-gray-400 text-left p-2">No</th>
                <th className="border border-gray-400 w-64 text-left p-2">Nama</th>
                <th className="border border-gray-400 w-64 text-left p-2">Email</th>
                <th className="border border-gray-400 w-64 text-left p-2">Jenis Test</th>
                <th className="border border-gray-400 w-28 text-left p-2">Mengerjakan</th>
                <th className="border border-gray-400 w-48 text-left p-2">Hasil Test</th>
                <th className="border border-gray-400 w-48 text-left p-2">Status</th>
                <th className="border border-gray-400 w-64 text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingTests.length > 0 &&
                bookingTests.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-400 p-1">{index++}</td>
                    <td className="border border-gray-400 p-1">{item.clients.fullName}</td>
                    <td className="border border-gray-400 p-1">{item.clients.email}</td>
                    <td className="border border-gray-400 p-1">{item.testypes.testName}</td>
                    <td className="border border-gray-400 p-1">Belum/Sudah</td>
                    <td className="border border-gray-400 p-1">
                      {item.resultUrl !== null ? (
                        <a href={item.resultUrl} target="_blank" className="font-semibold text-sky-500">
                          Link
                        </a>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="border border-gray-400 p-1">{item.isValidate === null ? 'Menunggu pembayaran' : item.isValidate === true ? 'Sudah bayar' : 'Belum bayar'}</td>
                    <td className="border border-gray-400 p-1 font-semibold text-sky-500">
                      {item.isValidate === null ? (
                        <div className="flex justify-between space-x-2">
                          <div
                            className={`bg-red-500 hover:bg-red-700 ${isProcess ? 'opacity-50 pointer-events-none' : ''} p-2 text-white w-1/2 text-center rounded-md cursor-pointer`}
                            onClick={() => {
                              isProcess ? undefined : handleValidate(item.id, { isValidate: false });
                            }}>
                            {isProcess ? 'Loading...' : 'Invalid'}
                          </div>
                          <div
                            className={`bg-green-500 hover:bg-green-700 ${isProcess ? 'opacity-50 pointer-events-none' : ''} p-2 text-white w-1/2 text-center rounded-md cursor-pointer`}
                            onClick={() => {
                              isProcess ? undefined : handleValidate(item.id, { isValidate: true });
                            }}>
                            {isProcess ? 'Loading...' : 'Valid'}
                          </div>
                        </div>
                      ) : item.isValidate === true ? (
                        'Valid'
                      ) : (
                        'Invalid'
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingTestAdmin;
