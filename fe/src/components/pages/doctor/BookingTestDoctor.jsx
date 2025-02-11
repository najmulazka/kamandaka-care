import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookingTest, updateBookingTestResult } from '../../../services/bookingTest.service';
import HeaderDoctor from '../../fragments/HeaderDoctor';

const BookingTestDoctor = () => {
  const navigate = useNavigate();
  const [bookingTests, setBookingTests] = useState({});
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingTest();
        setBookingTests(data);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/');
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleResult = async (id, e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append(`result`, file);
    await updateBookingTestResult(id, formData);
  };

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
              <th className="border border-gray-400 w-64 text-left p-2">Jenis Test</th>
              <th className="border border-gray-400 w-28 text-left p-2">Jawaban</th>
              <th className="border border-gray-400 w-48 text-left p-2">Hasil Test</th>
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
                  <td className="border border-gray-400 p-1">Lihat Jawaban</td>
                  <td className="border border-gray-400 p-1">
                    {item.resultUrl !== null ? (
                      <div>
                        {item.id}
                        <a href={item.resultUrl} target="_blank">
                          Lihat Hasil
                        </a>
                        <button className="border border-green-400 text-green-400 px-4 py-1 font-semibold rounded-full mb-6" onClick={() => document.getElementById('fileInput').click()}>
                          Upload Hasil
                        </button>
                        <input id="fileInput" type="file" accept=".pdf" onChange={(e) => handleResult(item.id, e)} style={{ display: 'none' }} />
                      </div>
                    ) : (
                      <div>
                        {item.id}
                        <button className="border border-green-400 text-green-400 px-4 py-1 font-semibold rounded-full mb-6" onClick={() => document.getElementById('fileInput').click()}>
                          Upload Hasil
                        </button>
                        <input id="fileInput" type="file" accept=".pdf" onChange={(e) => handleResult(item.id, e)} style={{ display: 'none' }} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTestDoctor;
