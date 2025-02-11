import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import HeaderClient from '../fragments/HeaderClient';
import { getServices } from '../../services/service.service';
import { createBooking, getBookingsClient, getScheedule } from '../../services/booking.service';
import { Link, useNavigate } from 'react-router-dom';
import { getBookingTestClient } from '../../services/bookingTest.service';

const Konsultasi = () => {
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [availables, setAvailables] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
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
        console.log(err);
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
    setIsLoading(!isLoading);
    const response = await getBookingsClient();
    const check = response.find((item) => item.isValidate === null);

    const response1 = await getBookingTestClient();
    const check1 = response1.find((item) => item.isValidate === null);
    if (check === undefined && check1 === undefined) {
      await createBooking(data);
      navigate('/client/payment');
      setIsLoading(!isLoading);
    } else {
      setData({});
      setIsPopUp(!isPopUp);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <HeaderClient />

      <div className="w-full flex font-semibold justify-center mt-6 text-gray-900">Pilih Jadwal Konsultasi</div>
      <div className="lg:grid lg:grid-cols-3 px-8 py-12">
        <div className="flex flex-col lg:space-y-2 items-end">
          <select name="service" id="" className="border border-gray-400 w-80 p-2 rounded-md" onChange={handleService}>
            <option value="select">Pilih Layanan</option>
            {services.length > 0 &&
              services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.serviceName}
                </option>
              ))}
          </select>
        </div>

        <div className="justify-center flex flex-wrap">
          <Calendar onChange={setDate} value={date} locale="id-ID" className="rounded-lg" tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} />
          {/* tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} */}
        </div>

        <div className="flex flex-wrap">
          {availables.length > 0 &&
            availables.map((available, index) => (
              <div key={index} onClick={() => handleAvailable(available)} className={`${data.time == available ? 'bg-sky-600' : 'bg-sky-300'} h-10 cursor-pointer w-20 mr-2 my-2 flex items-center justify-center rounded-md`}>
                {available}
              </div>
            ))}

          {serviceId == '' && <div className="flex items-center text-gray-500">Silahkan pilih Layanan konsultasi terlebih dahulu</div>}
          {availables.length == 0 && serviceId != '' && <div className="flex items-center text-gray-500">Sayang sekali jadwal yang dipilih tidak tersedia untuk saat ini</div>}
        </div>
      </div>
      <div className="fixed bottom-14 w-screen flex justify-between px-8 ">
        <div className="cursor-pointer bg-sky-500 px-4 py-1 rounded-md">
          <Link to="/client">Kembali</Link>
        </div>

        <div onClick={handleNext} className="cursor-pointer bg-sky-500 px-4 py-1 rounded-md">
          {isLoading ? 'Loading...' : 'Bayar'}
        </div>
      </div>

      {isPopUp && <div>Maaf masih terdapat proses booking yang belum di bayar atau belum divalidasi oleh admin</div>}
    </div>
  );
};

export default Konsultasi;
