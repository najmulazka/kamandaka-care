import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import HeaderClient from '../fragments/HeaderClient';

const Konsultasi = () => {
  const [date, setDate] = useState(new Date());

  const simpan = () => {
    console.log(format(date, 'EEEE', { locale: id }));
    console.log(format(date, 'dd MM yyyy', { locale: id }));
    console.log(date.toISOString());
  };
  return (
    <div>
      <HeaderClient />

      <div className="w-full flex justify-center">Konsultasi</div>
      <div className="lg:grid lg:grid-cols-3 px-8 py-16">
        <div className="flex flex-col lg:space-y-2 items-center">
          <div>Pilih Layanan</div>
          <div>
            <select name="service" id="" className="border border-gray-400 p-2 rounded-md">
              <option value="Select">Select</option>
              <option value="Select">Konsultasi Dokter Umum</option>
              <option value="Select">Tes Pesikolog</option>
              <option value="Select">Konsultasi gigi</option>
              <option value="Select">Konsultasi obat</option>
              <option value="Select">Konsultasi Terapi</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-100 justify-center flex flex-wrap">
          <Calendar onChange={setDate} value={date} locale="id-ID" tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} className="rounded-lg" />
          <p>Tanggal yang dipilih: {format(date, 'EEEE, d MMMM yyyy', { locale: id })}</p>
          <button onClick={simpan}>Simpan</button>
        </div>

        <div className="flex flex-wrap bg-blue-400">
          <div className="h-10 bg-blue-200 w-20 m-2 flex items-center justify-center rounded-md">00:00</div>
          <div className="h-10 bg-blue-200 w-20 m-2 flex items-center justify-center rounded-md">00:00</div>
          <div className="h-10 bg-blue-200 w-20 m-2 flex items-center justify-center rounded-md">00:00</div>
          <div className="h-10 bg-blue-200 w-20 m-2 flex items-center justify-center rounded-md">00:00</div>
          <div className="h-10 bg-blue-200 w-20 m-2 flex items-center justify-center rounded-md">00:00</div>
          <div className="h-10 bg-blue-200 w-20 m-2 flex items-center justify-center rounded-md">00:00</div>
          <div className="h-10 bg-blue-200 w-20 m-2 flex items-center justify-center rounded-md">00:00</div>
        </div>
      </div>
    </div>
  );
};

export default Konsultasi;
