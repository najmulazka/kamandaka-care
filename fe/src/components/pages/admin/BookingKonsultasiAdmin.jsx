import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
// import HeaderClient from '../fragments/HeaderClient';
import { getServices } from '../../../services/service.service';
import { createBookingOffline, getScheedule } from '../../../services/booking.service';
import { Link, useNavigate } from 'react-router-dom';
import PopUpAlert from '../../fragments/PopUpAlert';
import { toast } from 'react-toastify';

const BookingKonsultasiAdmin = () => {
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [availables, setAvailables] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [isProcess, setIsProcess] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
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
          navigate('/login-admin');
        } else if (err.status == 400) {
          toast.warn(err.response.data.err);
        } else if (err.status == 500) {
          toast.error('Aplikasi Error Silahkan Hubungi Developer');
        } else {
          toast.error(err.message);
        }
      } finally {
        setIsProcess(false);
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
      setIsProcess(true);
      if (data.serviceId === undefined || data.day === undefined || data.time === undefined) {
        setMessage('Silahkan Pilih Jenis layanan dan waktu untuk konsultasi');
        setIsPopUp(true);
      } else {
        await createBookingOffline(data);
      }
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        toast.warn('Please Login Now');
        navigate('/login-admin');
      } else if (err.status == 400) {
        toast.warn(err.response.data.err);
      } else if (err.status == 500) {
        toast.error('Aplikasi Error Silahkan Hubungi Developer');
      } else {
        toast.error(err.message);
      }
    } finally {
      setIsProcess(false);
    }
  };

  const toggleModal = () => {
    setData({});
    setIsPopUp(false);
  };

  return (
    <div className="">
      {/* <HeaderClient /> */}

      <div className="lg:grid grid-cols-2">
        <div>
          <div className="pl-6 pt-6 lg:p-4 lg:px-8 rounded-md flex">
            <Link to="/admin/booking">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
              </svg>
            </Link>
          </div>
          {/* </div> */}

          <div className="w-full flex font-semibold justify-center text-gray-900">Pilih Jadwal Konsultasi</div>
          <div className="px-8 pt-8 pb-20">
            <div className="lg:flex lg:flex-col lg:space-y-2 items-center mb-4">
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

            <div className="flex flex-wrap w-full justify-center">
              {availables.length > 0 &&
                availables.map((available, index) => (
                  <div
                    key={index}
                    onClick={() => handleAvailable(available)}
                    className={`${data.time == available ? 'bg-blue-600 border border-black' : 'bg-blue-300 hover:bg-blue-400'} cursor-pointer px-2 py-1 mr-2 my-2 flex items-center justify-center rounded-md`}>
                    {available}
                  </div>
                ))}

              {serviceId == '' && <div className="text-gray-500">Silahkan pilih Layanan konsultasi terlebih dahulu</div>}
              {availables.length == 0 && serviceId != '' && <div className="flex items-center text-gray-500">Sayang sekali jadwal yang dipilih tidak tersedia untuk saat ini</div>}
            </div>
          </div>
          <div className="mb-6 lg:mb-10 px-6 lg:px-8 w-full text-center">
            <div onClick={!isProcess ? handleNext : undefined} className={`cursor-pointer bg-[#29ADB2] hover:bg-[#BBE2EC] px-4 py-1 rounded-md ${isProcess ? 'opacity-50 pointer-events-none' : ''}`}>
              {isProcess ? 'Loading...' : 'Simpan'}
            </div>
          </div>
        </div>
        <div className="hidden lg:block min-h-screen">
          <img src="/consultation.jpg" className="h-full object-cover object-right" alt="" />
        </div>
      </div>

      <PopUpAlert isOpen={isPopUp} toggleModal={toggleModal}>
        {message}
      </PopUpAlert>
    </div>
  );
};

export default BookingKonsultasiAdmin;
