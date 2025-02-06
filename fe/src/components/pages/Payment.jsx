import { useEffect, useState } from 'react';
import HeaderClient from '../fragments/HeaderClient';
import { useNavigate } from 'react-router-dom';
import { getBookingsClient } from '../../services/booking.service';

const Payment = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  console.log(data);
  data
    .filter((item) => {
      item.isValidate === null;
    })
    .map((maping) => console.log(maping.id));

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

  return (
    <div>
      <HeaderClient />

      <div>Payment</div>
      <br />
      <div>Silahkan lakukan pembayaran dengan nominal Rp{data.length > 0 && data.find((item) => item.isValidate === null).services.price} ke nomor rekening 123456789 an.Kamandaka Care</div>
      <div>atau scan qr code</div>
      <br />
      <div>Jika sudah melakukan pembayaran harap kirim bukti pembayaran ke whatsapp</div>
    </div>
  );
};

export default Payment;
