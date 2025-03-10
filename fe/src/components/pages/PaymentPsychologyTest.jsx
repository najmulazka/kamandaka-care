import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookingTestClient } from '../../services/bookingTest.service';
import { toast } from 'react-toastify';
import Payment from '../fragments/Payment';

const PaymentPsychologyTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataBookingTest, setDataBookingTest] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await getBookingTestClient();
        setDataBookingTest(response1);
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

  
  useEffect(() => {
    const bookingTest = dataBookingTest.find((item) => item.id == id);
    if (!bookingTest) return;

    const createdAt = new Date(bookingTest.createdAt);
    const deadline = createdAt.getTime() + 3 * 60 * 60 * 1000;

    const updateRemainingTime = () => {
      const timeLeft = Math.max(0, deadline - Date.now());
      setRemainingTime(timeLeft);
    };

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000); 

    return () => clearInterval(timer);
  }, [dataBookingTest, id]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const bookingTest = dataBookingTest.find((item) => item.id == id);

  return (
    <div>
      {bookingTest?.isValidate === null ? (
        <Payment
          remainingTime={formatTime(remainingTime)}
          bookingName={bookingTest.testypes?.testName}
          price={bookingTest.testypes?.price}
        />
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
};

export default PaymentPsychologyTest;
