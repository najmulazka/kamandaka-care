import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
// import HeaderClient from '../fragments/HeaderClient';
import { getServices } from '../../services/service.service';
import { createBooking, getBookingsClient, getScheedule } from '../../services/booking.service';
import { Link, useNavigate } from 'react-router-dom';
import { getBookingTestClient } from '../../services/bookingTest.service';
import PopUpAlert from '../fragments/PopUpAlert';
import { toast } from 'react-toastify';

const Konsultasi = () => {
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [availables, setAvailables] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [isProcess, setIsProcess] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  console.log(isPopUp);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const services = await getServices();
        setServices(services);

        if (serviceId == '') {
          setAvailables([]);
        } else {
          const h = {
            serviceId,
            day: format(date, 'EEEE', { locale: id }),
            date: format(date, 'dd', { locale: id }),
            month: format(date, 'MM', { locale: id }),
            year: format(date, 'yyyy', { locale: id }),
          };

          const scheedule = await getScheedule(h);
          setAvailables(scheedule);
        }
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/');
        }
        if (err.status == 400) {
          toast.warn(err.response.data.err);
          setIsProcess(false);
        }
      }
    };

    fetchData();
  }, [serviceId, date]);

  const handleService = (event) => {
    if (event.target.value == 'select') {
      setServiceId('');
    } else {
      setServiceId(event.target.value);
    }
  };

  const handleAvailable = async (time) => {
    if (serviceId == '') {
      console.log(time);
    } else {
      const h = {
        serviceId,
        day: format(date, 'EEEE', { locale: id }),
        date: format(date, 'dd', { locale: id }),
        month: format(date, 'MM', { locale: id }),
        year: format(date, 'yyyy', { locale: id }),
        time,
      };

      setData(h);
    }
  };

  const handleNext = async () => {
    try {
      setIsProcess(!isProcess);
      const response = await getBookingsClient();
      const check = response.find((item) => item.isValidate === null);

      const response1 = await getBookingTestClient();
      const check1 = response1.find((item) => item.isValidate === null);
      if (data.serviceId === undefined || data.day === undefined || data.time === undefined) {
        setMessage('Silahkan Pilih Jenis layanan dan waktu untuk konsultasi');
        setIsPopUp(true);
        setIsProcess(false);
      } else if (check === undefined && check1 === undefined) {
        await createBooking(data);
        navigate('/client/payment');
        setIsProcess(false);
      } else {
        setData({});
        setMessage('Maaf masih terdapat proses booking yang belum di bayar atau belum divalidasi oleh admin');
        setIsPopUp(true);
        setIsProcess(false);
      }
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        toast.warn('Please Login Now');
        navigate('/');
      }
      if (err.status == 400) {
        toast.warn(err.response.data.err);
        setIsProcess(false);
      }
    }
  };

  const toggleModal = () => {
    setData({});
    setIsPopUp(false);
  };

  return (
    <div className="relative">
      {/* <HeaderClient /> */}

      {/* <div className="relative my-4 mx-6 lg:mx-8"> */}
      <div className="pl-6 pt-6 lg:p-4 lg:px-8 rounded-md flex">
        <Link to="/client">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
          </svg>
        </Link>
      </div>
      {/* </div> */}

      <div className="w-full flex font-semibold justify-center text-gray-900">Pilih Jadwal Konsultasi</div>
      <div className="lg:grid lg:grid-cols-3 px-8 pt-8 pb-20">
        <div className="lg:flex lg:flex-col lg:space-y-2 items-end mb-4">
          <select name="service" id="" className="border border-gray-400 w-full lg:w-80 p-2 rounded-md" onChange={handleService}>
            <option value="select">Pilih Layanan</option>
            {services.length > 0 &&
              services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.serviceName}
                </option>
              ))}
          </select>
        </div>

        <div className="justify-center flex mb-4">
          <Calendar onChange={setDate} value={date} locale="id-ID" className="rounded-lg" tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} />
          {/* tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} */}
        </div>

        <div className="flex flex-wrap">
          {availables.length > 0 &&
            availables.map((available, index) => (
              <div
                key={index}
                onClick={() => handleAvailable(available)}
                className={`${data.time == available ? 'bg-sky-600 text-white' : 'bg-sky-300'} cursor-pointer hover:bg-sky-600 px-2 py-1 mr-2 my-2 flex items-center justify-center rounded-md`}>
                {available}
              </div>
            ))}

          {serviceId == '' && <div className="flex items-center text-gray-500">Silahkan pilih Layanan konsultasi terlebih dahulu</div>}
          {availables.length == 0 && serviceId != '' && <div className="flex items-center text-gray-500">Sayang sekali jadwal yang dipilih tidak tersedia untuk saat ini</div>}
        </div>
      </div>
      <div className="absolute bottom-8 lg:bottom-0 px-6 lg:px-8 w-full text-center">
        <div onClick={!isProcess ? handleNext : undefined} className={`cursor-pointer bg-sky-500 hover:bg-sky-700  px-4 py-1 rounded-md ${isProcess ? 'opacity-50 pointer-events-none' : ''}`}>
          {isProcess ? 'Loading...' : 'Bayar'}
        </div>
      </div>

      <PopUpAlert isOpen={isPopUp} toggleModal={toggleModal}>
        {message}
      </PopUpAlert>
    </div>
  );
};

export default Konsultasi;
