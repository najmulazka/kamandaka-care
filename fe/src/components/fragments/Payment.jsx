import HeaderClient from './HeaderClient';

const Payment = (props) => {
  const {remainingTime, bookingName, price } = props;
  return (
    <div>
      <HeaderClient />

      <div className="w-full flex font-semibold justify-center mt-6 text-gray-900">Pembayaran</div>
      <div className="w-full flex justify-center text-gray-900">{remainingTime}</div>
      <div className="px-8 py-12 flex justify-center">
        <div className="text-center">
          <div>
            Silahkan lakukan pembayaran {bookingName} dengan nominal Rp {price} ke Bank BSI.1100000567 an.KLINIK KAMANDAKA
          </div>
          <div className="m-4">atau scan qr code</div>
          <div className="align-center flex justify-center">
            <img className="border border-black lg:w-1/4" src="/qr.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="text-center mb-10">
        Jika sudah melakukan pembayaran harap kirim bukti pembayaran ke
        <strong className="text-sky-500 underline">
          <a href="https://wa.me/+6287844760789">whatsapp admin</a>
        </strong>
      </div>
    </div>
  );
};

export default Payment;
