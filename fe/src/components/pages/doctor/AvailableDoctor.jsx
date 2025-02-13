import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderDoctor from '../../fragments/HeaderDoctor';
import { getServiceTime, putServiceTime } from '../../../services/serviceTime.service';

const AvailableDoctor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedServiceTime, setSelectedServiceTime] = useState(null);
  const [availableDays, setAvailableDays] = useState({});
  console.log(availableDays);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/');
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
    await putServiceTime(selectedServiceTime.id, {
      senin: availableDays.Senin.checked,
      startTimeSenin: availableDays.Senin.startTime,
      endTimeSenin: availableDays.Senin.endTime,
      selasa: availableDays.Senin.checked,
      startTimeSelasa: availableDays.Selasa.startTime,
      endTimeSelasa: availableDays.Selasa.endTime,
      rabu: availableDays.Senin.checked,
      startTimeRabu: availableDays.Rabu.startTime,
      endTimeRabu: availableDays.Rabu.endTime,
      kamis: availableDays.Senin.checked,
      startTimeKamis: availableDays.Kamis.startTime,
      endTimeKamis: availableDays.Kamis.endTime,
      jumat: availableDays.Senin.checked,
      startTimeJumat: availableDays.Jumat.startTime,
      endTimeJumat: availableDays.Jumat.endTime,
      sabtu: availableDays.Senin.checked,
      startTimeSabtu: availableDays.Sabtu.startTime,
      endTimeSabtu: availableDays.Sabtu.endTime,
      minggu: availableDays.Senin.checked,
      startTimeMinggu: availableDays.Minggu.startTime,
      endTimeMinggu: availableDays.Minggu.endTime,
    });
  };

  return (
    <div>
      <HeaderDoctor />
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
                        className="w-14 text-center border border-gray-900 rounded-md"
                      />
                      <div>-</div>
                      <input
                        type="text"
                        value={availableDays[day].endTime}
                        onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                        disabled={!availableDays[day].checked}
                        className="w-14 text-center border border-gray-900 rounded-md"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="w-full flex justify-center mt-4">
            <button onClick={handleSimpan} className="bg-green-400 p-2 w-full font-semibold rounded-md">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableDoctor;
