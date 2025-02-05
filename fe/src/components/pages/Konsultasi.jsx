import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import HeaderClient from '../fragments/HeaderClient';
import { getServices } from '../../services/service.service';
import { getScheedule } from '../../services/booking.service';

const Konsultasi = () => {
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [availables, setAvailables] = useState([]);
  const [serviceId, setServiceId] = useState('');

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

  return (
    <div>
      <HeaderClient />

      <div className="w-full flex justify-center">Konsultasi</div>
      <div className="lg:grid lg:grid-cols-3 px-8 py-16">
        <div className="flex flex-col lg:space-y-2 items-center">
          <div>Pilih Layanan</div>
          <div>
            <select name="service" id="" className="border border-gray-400 p-2 rounded-md" onChange={handleService}>
              <option value="select">Select</option>
              {services.length > 0 &&
                services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.serviceName}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="bg-blue-100 justify-center flex flex-wrap">
          <Calendar onChange={setDate} value={date} locale="id-ID" className="rounded-lg" />
        </div>

        <div className="flex flex-wrap bg-blue-400">
          {availables.length > 0 &&
            availables.map((available, index) => (
              <div key={index} className="h-10 bg-blue-200 w-20 m-2 flex items-center justify-center rounded-md">
                {available}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Konsultasi;
