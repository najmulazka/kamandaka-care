import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderDoctor from '../../fragments/HeaderDoctor';
import { getBookingTestAnswer } from '../../../services/bookingTest.service';
import { toast } from 'react-toastify';

const BookingTestAnswerDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  console.log(answers);
  const [loading, setLoading] = useState(false);
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBookingTestAnswer(id);
        console.log(data);
        setAnswers(data);
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

  return (
    <div>
      <HeaderDoctor />
      <div className="p-6 px-8 lg:justify-center lg:flex">
        {loading && <div>Loading...</div>}
        {!loading && Object.values(answers).length === 0 && <div>Client belum menyelesaikan soal test</div>}
        {Object.values(answers).length > 0 && (
          <table className="border-collapse border border-gray-400">
            <thead className="bg-sky-300">
              <tr>
                <th className="border border-gray-400 text-left p-2">No</th>
                <th className="border border-gray-400 w-64 lg:w-auto text-left p-2">Soal</th>
                <th className="border border-gray-400 w-64 text-left p-2">Jawaban</th>
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

              {Object.entries(answers).map(([key, value]) => (
                // console.log(`Key: ${key}, Value: ${value}`);
                <tr key={index}>
                  <td className="border border-gray-400 p-1">{index++}</td>
                  <td className="border border-gray-400 p-1">{key}</td>
                  <td className="border border-gray-400 p-1">{value}</td>
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
