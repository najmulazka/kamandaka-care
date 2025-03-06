import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import HeaderAdmin from '../../fragments/HeaderAdmin';
import { getBooking } from '../../../services/booking.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ReportAdmin = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('month');
  const navigate = useNavigate();
  const [bookings, setBookings] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let index = 1;

  let formatter = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });

  const formatDate = formatter.format(selectedDate).toUpperCase();
  const [, , month, year] = formatDate.split(' ');

  const handleChange = (event) => {
    setSelectedValue(event.target.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let query = {};
        if (selectedValue === 'date') {
          query = {
            date: selectedDate.getDate(),
            month: selectedDate.getMonth() + 1,
            year: selectedDate.getFullYear(),
          };
        } else if (selectedValue === 'month') {
          query = {
            month: selectedDate.getMonth() + 1,
            year: selectedDate.getFullYear(),
          };
        } else if (selectedValue === 'year') {
          query = {
            year: selectedDate.getFullYear(),
          };
        }

        const data = await getBooking(query);
        setBookings(data);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/login-admin');
        } else if (err.response?.status === 400) {
          toast.warn(err.response.data.err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedValue, selectedDate]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="p-4 lg:px-8 flex space-x-6 print:hidden">
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd MMMM YYYY" placeholderText="Select a date" className="border border-blue-500 px-2 py-1 rounded-md" />
        <div className="flex space-x-4">
          <div className="flex space-x-1 items-center">
            <input type="radio" name="range" id="date" checked={selectedValue === 'date'} onChange={handleChange} />
            <label htmlFor="date">Tanggal</label>
          </div>
          <div className="flex space-x-1 items-center">
            <input type="radio" name="range" id="month" checked={selectedValue === 'month'} onChange={handleChange} />
            <label htmlFor="month">Bulan</label>
          </div>
          <div className="flex space-x-1 items-center">
            <input type="radio" name="range" id="year" checked={selectedValue === 'year'} onChange={handleChange} />
            <label htmlFor="year">Tahun</label>
          </div>
        </div>
      </div>
      <div className="px-8 lg:justify-center lg:flex flex-col print:hidden">
        <div className="flex justify-end">
          <div onClick={handlePrint} className="bg-green-600 py-1 px-2 rounded-md hover:bg-green-700 hover:cursor-pointer font-semibold text-white">
            Download/Print
          </div>
        </div>
      </div>
      <div className="p-10 px-8">
        <div className="font-semibold text-xl text-center">LAPORAN {selectedValue == 'date' ? `HARI ${formatDate} ` : selectedValue == 'month' ? `BULAN ${month} ${year}` : `TAHUN ${year}`}</div>
        <div className="font-semibold text-xl text-center mb-4">KLINIK PRATAMA KAMANDAKA</div>
        {isLoading ? (
          'Loading...'
        ) : (
          <div className="">
            <table className="border-collapse border border-gray-400 w-full m-4 ">
              <thead className="bg-sky-300">
                <tr className="">
                  <th className="border border-gray-400 w-10 text-left p-2">No</th>
                  <th className="border border-gray-400 w-64 text-left p-2">Nama</th>
                  <th className="border border-gray-400 w-64 text-left p-2">Email</th>
                  <th className="border border-gray-400 w-28 text-left p-2">Type</th>
                  <th className="border border-gray-400 w-48 text-left p-2">Jenis Layanan</th>
                  <th className="border border-gray-400 w-48 text-left p-2">Tanggal Booking</th>
                  <th className="border border-gray-400 w-48 text-left p-2">Tanggal Konsultasi</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 &&
                  bookings.map((item) => (
                    <tr key={item.id} className="break-inside-avoid">
                      <td className="border border-gray-400 p-1">{index++}</td>
                      <td className="border border-gray-400 p-1">{item.clients.fullName}</td>
                      <td className="border border-gray-400 p-1">{item.clients.email}</td>
                      <td className="border border-gray-400 p-1">{item.type}</td>
                      <td className="border border-gray-400 p-1">{item.services.serviceName}</td>
                      <td className="border border-gray-400 p-1">{item.createdAt}</td>
                      <td className="border border-gray-400 p-1">{item.dateTime}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportAdmin;
