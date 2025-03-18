import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Payment from '../fragments/Payment';
import { getBookingsClient } from '../../services/booking.service';

const PaymentKonsultasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataBooking, setDataBooking] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBookingsClient();
        setDataBooking(response);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/');
        } else if (err.response?.status === 400) {
          toast.warn(err.response.data.err);
        } else {
          toast.error('Failed to fetch bookings');
        }
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const booking = dataBooking.find((item) => item.id == id);
    if (!booking) return;

    const createdAt = new Date(booking.createdAt);
    const deadline = createdAt.getTime() + 3 * 60 * 60 * 1000;

    const updateRemainingTime = () => {
      const timeLeft = Math.max(0, deadline - Date.now());
      setRemainingTime(timeLeft);
    };

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [dataBooking, id]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const booking = dataBooking.find((item) => item.id == id);

  return <div>{booking?.isValidate === null ? <Payment remainingTime={formatTime(remainingTime)} bookingName={booking.services?.serviceName} price={booking.services?.price} /> : <div>Not Found</div>}</div>;
};

export default PaymentKonsultasi;
