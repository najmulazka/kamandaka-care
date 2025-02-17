import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBookingTestDoctor, updateBookingTestResult } from '../../../services/bookingTest.service';
import HeaderDoctor from '../../fragments/HeaderDoctor';

const BookingTestDoctor = () => {
  const navigate = useNavigate();
  const [bookingTests, setBookingTests] = useState([]);
  const fileInputRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingTestDoctor();
        setBookingTests(data);

        const refs = {};
        data.forEach((item) => {
          refs[item.id] = refs[item.id] || React.createRef();
        });
        fileInputRefs.current = refs;
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
    formData.append('result', file);
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
            {bookingTests.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-400 p-1">{index + 1}</td>
                <td className="border border-gray-400 p-1">{item.clients.fullName}</td>
                <td className="border border-gray-400 p-1">{item.clients.email}</td>
                <td className="border border-gray-400 p-1">{item.testypes.testName}</td>
                <td className="border border-gray-400 p-1">
                  <Link to={`/doctor/booking-test/answer/${item.questionUrl.split('/').pop()}`} className="text-sky-500 hover:text-sky-700 font-semibold">
                    Lihat Jawaban
                  </Link>
                </td>
                <td className="border border-gray-400 p-1">
                  {item.resultUrl ? (
                    <div>
                      <a href={item.resultUrl} target="_blank" rel="noopener noreferrer">
                        Lihat Hasil
                      </a>
                      <button className="border bg-green-500 hover:bg-green-700 text-white px-4 py-1 font-semibold rounded-full" onClick={() => fileInputRefs.current[item.id].current.click()}>
                        Upload Hasil
                      </button>
                      <input ref={fileInputRefs.current[item.id]} type="file" accept=".pdf" onChange={(e) => handleResult(item.id, e)} style={{ display: 'none' }} />
                    </div>
                  ) : (
                    <div className="">
                      <button className="border bg-green-500 text-white hover:bg-green-700 px-4 py-1 font-semibold rounded-full" onClick={() => fileInputRefs.current[item.id].current.click()}>
                        Upload Hasil
                      </button>
                      <input ref={fileInputRefs.current[item.id]} type="file" accept=".pdf" onChange={(e) => handleResult(item.id, e)} style={{ display: 'none' }} />
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
