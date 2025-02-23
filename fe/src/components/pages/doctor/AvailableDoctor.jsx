import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderDoctor from '../../fragments/HeaderDoctor';
import { getServiceTime, putServiceTime } from '../../../services/serviceTime.service';
import { toast } from 'react-toastify';

const AvailableDoctor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedServiceTime, setSelectedServiceTime] = useState(null);
  console.log(selectedServiceTime);
  const [availableDays, setAvailableDays] = useState({});
  const [isProcess, setIsProcess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getServiceTime();
        const selected = response.find((item) => item.servicesId == id);
        if (selected) {
          setSelectedServiceTime(selected);
          setAvailableDays({
            Senin: { checked: selected.senin, startTime: selected.startTimeSenin || '', endTime: selected.endTimeSenin || '' },
            Selasa: { checked: selected.selasa, startTime: selected.startTimeSelasa || '', endTime: selected.endTimeSelasa || '' },
            Rabu: { checked: selected.rabu, startTime: selected.startTimeRabu || '', endTime: selected.endTimeRabu || '' },
            Kamis: { checked: selected.kamis, startTime: selected.startTimeKamis || '', endTime: selected.endTimeKamis || '' },
            Jumat: { checked: selected.jumat, startTime: selected.startTimeJumat || '', endTime: selected.endTimeJumat || '' },
            Sabtu: { checked: selected.sabtu, startTime: selected.startTimeSabtu || '', endTime: selected.endTimeSabtu || '' },
            Minggu: { checked: selected.minggu, startTime: selected.startTimeMinggu || '', endTime: selected.endTimeMinggu || '' },
          });
        }
        setIsLoading(false);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-doctor');
        }
      }
    };
    fetchData();
  }, [navigate, id]);

  const handleCheckboxChange = (day) => {
    setAvailableDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], checked: !prev[day].checked },
    }));
  };

  const handleTimeChange = (day, type, value) => {
    setAvailableDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  const handleSimpan = async () => {
    try {
      setIsProcess(true);
      await putServiceTime(selectedServiceTime.id, {
        senin: availableDays.Senin.checked,
        startTimeSenin: availableDays.Senin.startTime,
        endTimeSenin: availableDays.Senin.endTime,
        selasa: availableDays.Selasa.checked,
        startTimeSelasa: availableDays.Selasa.startTime,
        endTimeSelasa: availableDays.Selasa.endTime,
        rabu: availableDays.Rabu.checked,
        startTimeRabu: availableDays.Rabu.startTime,
        endTimeRabu: availableDays.Rabu.endTime,
        kamis: availableDays.Kamis.checked,
        startTimeKamis: availableDays.Kamis.startTime,
        endTimeKamis: availableDays.Kamis.endTime,
        jumat: availableDays.Jumat.checked,
        startTimeJumat: availableDays.Jumat.startTime,
        endTimeJumat: availableDays.Jumat.endTime,
        sabtu: availableDays.Sabtu.checked,
        startTimeSabtu: availableDays.Sabtu.startTime,
        endTimeSabtu: availableDays.Sabtu.endTime,
        minggu: availableDays.Minggu.checked,
        startTimeMinggu: availableDays.Minggu.startTime,
        endTimeMinggu: availableDays.Minggu.endTime,
      });
      toast.success('Waktu Layanan Berhasil di Perbarui', { position: 'top-center' });
      setIsProcess(false);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        toast.warn('Please Login Now')
        navigate('/login-doctor');
      }
      if (err.status == 400) {
        toast.error(err.response.data.err);
        setIsProcess(false);
      }
    }
  };

  return (
    <div>
      <HeaderDoctor />
      <div className="flex flex-col items-center p-6 px-8">
        <div className="font-semibold text-gray-900 text-xl">Waktu Layanan {selectedServiceTime && selectedServiceTime.services.serviceName}</div>
        {isLoading ? (
          'Loading...'
        ) : (
          <div className="w-full">
            <div className="w-full flex justify-center">
              <div className="lg:w-1/4 p-6">
                {selectedServiceTime && (
                  <table className="border border-gray-300 rounded-md w-full">
                    <thead>
                      <tr>
                        <th colSpan="2 p-2">Hari</th>
                        <th className="p-2">Jam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(availableDays).map((day) => (
                        <tr key={day} className="mb-2">
                          <td className="text-center">
                            <input type="checkbox" className="w-6 h-6 bg-blue-300" checked={availableDays[day].checked} onChange={() => handleCheckboxChange(day)} />
                          </td>
                          <td>{day} :</td>
                          <td className="flex space-x-2 p-2 justify-center">
                            <input
                              type="text"
                              value={availableDays[day].startTime}
                              onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                              disabled={!availableDays[day].checked}
                              className={`w-14 text-center ${!availableDays[day].checked ? 'opacity-50' : ''} border border-gray-900 rounded-md`}
                            />
                            <div>-</div>
                            <input
                              type="text"
                              value={availableDays[day].endTime}
                              onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                              disabled={!availableDays[day].checked}
                              className={`w-14 ${!availableDays[day].checked ? 'opacity-50' : ''} text-center border border-gray-900 rounded-md`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <div className="w-full flex justify-center mt-4">
                  <button onClick={isProcess ? undefined : handleSimpan} className={`bg-green-500 hover:bg-green-700 ${isProcess ? 'opacity-50 pointer-events-none' : ''} text-white p-2 w-full font-semibold rounded-md`}>
                    {isProcess ? 'Loading...' : 'Simpan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableDoctor;
