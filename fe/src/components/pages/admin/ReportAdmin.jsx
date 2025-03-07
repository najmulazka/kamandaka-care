import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import HeaderAdmin from '../../fragments/HeaderAdmin';
import { getBooking } from '../../../services/booking.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBookingTest } from '../../../services/bookingTest.service';

const ReportAdmin = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('month');
  const navigate = useNavigate();
  const [bookings, setBookings] = useState({});
  const [bookingTests, setBookingTests] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let index = 1;
  const [dateTime, setDateTime] = useState(new Date());

  let formatter = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Jakarta',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        const response = await getBookingTest(query);
        setBookingTests(response);
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
        <div className="lg:grid grid-cols-4 gap-4">
          <div>
            {[
              { label: 'Total Booking', value: bookingTests.length + bookings.length },
              { label: 'Total Tes', value: bookingTests.length },
              { label: 'Total Konsultasi', value: bookings.length },
              {
                label: 'Total Layanan Online',
                value: bookings.length > 0 ? Number(bookings.filter((booking) => booking.type === 'Online').length) + Number(bookingTests.length) : 0,
              },
              {
                label: 'Total Layanan Offline',
                value: bookings.length > 0 ? bookings.filter((booking) => booking.type === 'Offline').length : 0,
              },
            ].map((item, index) => (
              <div key={index} className="flex justify-between border-b pb-1">
                <span className="font-medium">{item.label}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="col-span-3 relative">
            <div className="lg:absolute right-0 bottom-2">{formatter.format(dateTime)}</div>
          </div>
        </div>
        {isLoading ? (
          'Loading...'
        ) : (
          <div className="">
            <table className="border-collapse border border-gray-400 w-full">
              <thead className="bg-sky-300">
                <tr className="">
                  <th className="border border-gray-400 w-10 text-left p-2">No</th>
                  <th className="border border-gray-400 w-64 text-left p-2">Nama</th>
                  <th className="border border-gray-400 w-64 text-left p-2">Email</th>
                  <th className="border border-gray-400 w-28 text-left p-2">Type</th>
                  <th className="border border-gray-400 w-48 text-left p-2">Jenis Layanan</th>
                  <th className="border border-gray-400 w-48 text-left p-2">Tanggal Booking</th>
                  <th className="border border-gray-400 w-48 text-left p-2">Tanggal Tes/Konsultasi</th>
                </tr>
              </thead>
              <tbody>
                {bookingTests.length > 0 &&
                  bookingTests.map((item) => (
                    <tr key={item.id} className="break-inside-avoid">
                      <td className="border border-gray-400 p-1">{index++}</td>
                      <td className="border border-gray-400 p-1">{item.clients.fullName}</td>
                      <td className="border border-gray-400 p-1">{item.clients.email}</td>
                      <td className="border border-gray-400 p-1">Online</td>
                      <td className="border border-gray-400 p-1">{item.testypes.testName}</td>
                      <td className="border border-gray-400 p-1">{item.createdAt}</td>
                      <td className="border border-gray-400 p-1">{item.createdAt}</td>
                    </tr>
                  ))}
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
