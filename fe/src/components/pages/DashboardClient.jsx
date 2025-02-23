import { Link } from 'react-router-dom';
import HeaderClient from '../fragments/HeaderClient';

const DashboardClient = () => {
  return (
    <div className="">
      <HeaderClient />
      <div className="p-4 lg:px-8">
        <div className="flex justify-center mt-6 mb-10 space-x-6">
          <Link to="/client/konsultasi" className="h-16 w-36 bg-[#29ADB2] hover:bg-[#BBE2EC] flex items-center justify-center rounded-md cursor-pointer">
            Konsultasi
          </Link>
          <Link to="/client/psychology-test" className="h-16 w-36 bg-[#29ADB2] hover:bg-[#BBE2EC] flex items-center justify-center rounded-md cursor-pointer">
            Tes Psikologi
          </Link>
        </div>

        <div className="font-semibold mb-2 border border-2 border-[#29ADB2] px-2 py-1 rounded-md shadow-md shadow-gray-400">Cara Melakukan Booking Konsultasi :</div>
        <div className="mb-1">
          1. Mulai proses pemesanan dengan menekan tombol Konsultasi
          {/* <strong>&rarr;</strong> */}
          {/* <Link to="/client/konsultasi" className="ml-2 font-semibold bg-sky-400 px-2 py-1 rounded-md cursor-pointer">
            Konsultasi
          </Link> */}
        </div>
        <div className="mb-1">2. Pilih jenis layanan konsultasi yang sesuai dengan kebutuhan Anda.</div>
        <div className="mb-1">3. Tentukan jadwal konsultasi berdasarkan waktu yang tersedia.</div>
        <div className="mb-1">4. Selesaikan pembayaran, lalu kirimkan bukti pembayaran melalui WhatsApp kepada admin untuk validasi.</div>
        <div className="mb-1">5. Setelah pembayaran diverifikasi oleh admin, link Zoom untuk sesi konsultasi akan masuk ke email Anda.</div>
        <div className="mb-1">6. Pada waktu yang telah Anda pilih, silakan bergabung ke sesi konsultasi melalui link Zoom yang telah diberikan.</div>
      </div>

      <div className="p-4 lg:px-8">
        <div className="font-semibold mb-2 border border-2 border-[#29ADB2] px-2 py-1 rounded-md shadow-md shadow-gray-400">Cara Melakukan Booking Tes Psikologi :</div>
        <div className="mb-1">
          1. Mulai proses pemesanan dengan menekan tombol Tes Psikologi
          {/* <strong>&rarr;</strong>
          <Link to="/client/psychology-test" className="ml-2 font-semibold bg-sky-400 px-2 py-1 rounded-md cursor-pointer">
            Tes Psikologi
          </Link> */}
        </div>
        <div className="mb-1">2. Pilih tingkat pendidikan Anda.</div>
        <div className="mb-1">3. Pilih jenis tes Psikologi yang sesuai dengan kebutuhan Anda.</div>
        <div className="mb-1">4. Selesaikan pembayaran, lalu kirimkan bukti pembayaran melalui WhatsApp kepada admin untuk validasi.</div>
        <div className="mb-1">5. Setelah pembayaran diverifikasi oleh admin, link soal tes Psikologi akan masuk ke email Anda.</div>
        <div className="mb-1">6. Silahkan kerjakan soal tes Psikologi sesuai pendirian anda.</div>
      </div>
    </div>
  );
};

export default DashboardClient;
