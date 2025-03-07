import { useEffect, useState } from 'react';
import HeaderClient from '../fragments/HeaderClient';
import { useNavigate } from 'react-router-dom';
import { getBookingsClient } from '../../services/booking.service';
import { getBookingTestClient } from '../../services/bookingTest.service';
import { toast } from 'react-toastify';

const Payment = () => {
  const navigate = useNavigate();
  const [dataBooking, setDataBooking] = useState([]);
  const [dataBookingTest, setDataBookingTest] = useState([]);
  console.log(dataBookingTest);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBookingsClient();
        setDataBooking(response);

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

  return (
    <div>
      <HeaderClient />

      <div className="w-full flex font-semibold justify-center mt-6 text-gray-900">Pembayaran</div>
      <div className="px-8 py-12 flex justify-center">
        <div className="text-center">
          {dataBooking.length > 0 && dataBooking.find((item) => item.isValidate === null) && (
            <div>Silahkan lakukan pembayaran dengan nominal Rp {dataBooking.find((item) => item.isValidate === null).services.price} ke Bank BSI.1100000567 an.KLINIK KAMANDAKA</div>
          )}
          {dataBookingTest.length > 0 && dataBookingTest.find((item) => item.isValidate === null) && (
            <div>Silahkan lakukan pembayaran dengan nominal Rp {dataBookingTest.find((item) => item.isValidate === null).testypes.price} ke Bank BSI.1100000567 an.KLINIK KAMANDAKA</div>
          )}
          <div className="m-4">atau scan qr code</div>
          <div className="align-center flex justify-center">
            <img className="border border-black" src="/qr.png" alt="" />
          </div>
        </div>
      </div>
      <div className="text-center">
        Jika sudah melakukan pembayaran harap kirim bukti pembayaran ke
        <strong className="text-sky-500 underline">
          <a href="https://wa.me/+6287844760789">whatsapp admin</a>
        </strong>
      </div>
    </div>
  );
};

export default Payment;
