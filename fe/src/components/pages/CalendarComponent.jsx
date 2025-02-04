import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const simpan = () => {
    console.log(format(date, 'EEEE', { locale: id }));
    console.log(format(date, 'dd MM yyyy', { locale: id }));
    console.log(date.toISOString());
  };

  return (
    <div>
      <h2>Pilih Tanggal:</h2>
      <Calendar onChange={setDate} value={date} locale="id-ID" tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} />
      <p>Tanggal yang dipilih: {format(date, 'EEEE, d MMMM yyyy', { locale: id })}</p>
      <button onClick={simpan}>Simpan</button>
    </div>
  );
};

export default MyCalendar;
