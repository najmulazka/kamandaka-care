import { Link, useNavigate } from 'react-router-dom';
import HeaderClient from '../fragments/HeaderClient';
import { useEffect, useState } from 'react';
import { getEducations } from '../../services/education.service';
import { getTestTypes } from '../../services/testType.service';
import { createBookingTest, getBookingTestClient } from '../../services/bookingTest.service';
import { getBookingsClient } from '../../services/booking.service';

const PsychologyTest = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState('');
  const [educations, setEducations] = useState([]);
  const [testTypes, setTestTypes] = useState({});
  const [testType, setTestType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  console.log(testTypes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEducations();
        setEducations(data);

        const types = await getTestTypes();
        setTestTypes(types);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/');
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleChange = (event) => {
    setEducation(event.target.value);
  };

  const handleTesType = (id) => {
    setTestType(id);
  };

  const handleCreateBookingTest = async () => {
    setIsLoading(!isLoading);
    if (testType == '') {
      setIsPopUp(!isPopUp);
    } else {
      const response = await getBookingTestClient();
      const check = response.find((item) => item.isValidate === null);

      const response1 = await getBookingsClient();
      const check1 = response1.find((item) => item.isValidate === null);
      if (check === undefined && check1 === undefined) {
        await createBookingTest({ testTypeId: testType });
        navigate('/client/payment');
        setIsLoading(!isLoading);
      } else {
        setTestType('');
        setIsPopUp(!isPopUp);
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <HeaderClient />
      <div className="w-full flex font-semibold justify-center mt-6 text-gray-900">Pilih Jenis Tes</div>
      <div className="lg:grid lg:grid-cols-2">
        <div className="p-3 flex flex-col items-end">
          <select name="education" id="" className="border border-gray-400 w-80 p-2 rounded-md" onChange={handleChange}>
            <option value="Select">Pilih Pendidikan</option>
            {educations.length > 0 &&
              educations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.educationLevel}
                </option>
              ))}
          </select>
        </div>

        <div className="">
          {/* <div className="font-semibold text-gray-900 mb-4">Jenis Tes</div> */}
          <div className="grid grid-cols-2">
            {testTypes.length > 0 &&
              testTypes
                .filter((data) => data.educationId == education)
                .map((item) => (
                  <div key={item.id} className="w-full p-3 cursor-pointer" onClick={() => handleTesType(item.id)}>
                    <div className="bg-sky-300 p-2 rounded-md">
                      <div>{item.testName}</div>
                      <div className="text-xs text-gray-500">Harga Rp{item.price}</div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {isPopUp && <div>Maaf masih terdapat proses booking yang belum di bayar atau belum divalidasi oleh admin</div>}

      <div className="fixed bottom-14 px-8 flex justify-between w-screen">
        <div className="cursor-pointer bg-sky-500 px-4 py-1 rounded-md">
          <Link to="/client">Kembali</Link>
        </div>

        <div className="cursor-pointer bg-sky-500 px-4 py-1 rounded-md" onClick={handleCreateBookingTest}>
          {isLoading ? 'Loading...' : 'Bayar'}
        </div>
      </div>
    </div>
  );
};

export default PsychologyTest;
