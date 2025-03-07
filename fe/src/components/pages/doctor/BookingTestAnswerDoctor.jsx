import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderDoctor from '../../fragments/HeaderDoctor';
import { getBookingTestAnswer } from '../../../services/bookingTest.service';
import { toast } from 'react-toastify';

const BookingTestAnswerDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [bookingTest, setBookingTest] = useState({});
  const [loading, setLoading] = useState(false);
  // let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBookingTestAnswer(id);
        setAnswers(data.answer);
        setBookingTest(data.bookingTest);
        setLoading(false);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/login-doctor');
        }
        if (err.status == 400) {
          toast.warn(err.response.data.err);
        }
      }
    };
    fetchData();
  }, [navigate]);

  console.log(bookingTest?.testypes?.testName ? bookingTest.testypes.testName : 'Loading...');

  return (
    <div>
      <HeaderDoctor />
      <div className="lg:px-8 p-6">
        <Link to="/doctor/booking-test">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
          </svg>
        </Link>
      </div>

      <div className="w-full flex font-semibold justify-center text-gray-900 mb-2 text-lg lg:text-xl">JAWABAN {bookingTest?.testypes?.testName ? bookingTest.testypes.testName.toUpperCase() : 'Loading...'}</div>
      <div className="p-6 px-8 lg:justify-center lg:flex">
        {loading && <div>Loading...</div>}
        {!loading && Object.values(answers).length === 0 && <div>Client belum menyelesaikan soal test</div>}
        {Object.values(answers).length > 0 && (
          <table className="border-collapse border border-gray-400 w-full">
            <thead className="bg-sky-300">
              <tr>
                <th className="border border-gray-400 w-8 text-left p-2">No</th>
                <th className="border border-gray-400 w-64 lg:w-auto text-left p-2">Soal</th>
                <th className="border border-gray-400 text-left p-2">Jawaban</th>
              </tr>
            </thead>
            <tbody>
              {/* {Object.values(answers).map((item) =>
                item.type !== 'control_button' && item.type !== 'control_head' ? (
                  <tr key={item.order}>
                    <td className="border border-gray-400 p-1">{index++}</td>
                    <td className="border border-gray-400 p-1">{item.text}</td>
                    <td className="border border-gray-400 p-1">{item.answer}</td>
                  </tr>
                ) : null
              )} */}

              {Object.entries(answers).map(([key, value], index) => (
                <tr key={index}>
                  <td className={`border border-gray-400 p-1 text-center ${index < 2 ? 'bg-green-200' : ''}`}>{index >= 2 ? index - 1 : ''}</td>
                  <td className={`border border-gray-400 p-1 ${index < 2 ? 'bg-green-200' : ''}`}>{key}</td>
                  <td className={`border border-gray-400 p-1 ${index < 2 ? 'bg-green-200' : ''}`}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookingTestAnswerDoctor;
