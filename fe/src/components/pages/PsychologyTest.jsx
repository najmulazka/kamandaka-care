import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEducations } from '../../services/education.service';
import { getTestTypes } from '../../services/testType.service';
import { createBookingTest, getBookingTestClient } from '../../services/bookingTest.service';
import { getBookingsClient } from '../../services/booking.service';
import PopUpAlert from '../fragments/PopUpAlert';

const PsychologyTest = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState('');
  const [educations, setEducations] = useState([]);
  const [testTypes, setTestTypes] = useState({});
  const [testType, setTestType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [message, setMessage] = useState('');
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
    const response = await getBookingsClient();
    const check = response.find((item) => item.isValidate === null);

    const response1 = await getBookingTestClient();
    const check1 = response1.find((item) => item.isValidate === null);
    if (testType == '') {
      setMessage('Silahkan pilih jenis tes terlebih dahulu');
      setIsPopUp(true);
      setIsLoading(false);
    } else if (check === undefined && check1 === undefined) {
      await createBookingTest({ testTypeId: testType });
      navigate('/client/payment');
      setIsLoading(false);
    } else {
      setTestType('');
      setMessage('Maaf masih terdapat proses booking yang belum di bayar atau belum divalidasi oleh admin');
      setIsPopUp(true);
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setTestType('');
    setIsPopUp(false);
  };

  return (
    <div className="relative">
      {/* <HeaderClient /> */}
      <div className="pl-6 pt-6 lg:p-4 lg:px-8 rounded-md flex">
        <Link to="/client">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
          </svg>
        </Link>
      </div>

      <div className="w-full flex font-semibold justify-center text-gray-900">Pilih Jenis Tes</div>
      <div className="lg:grid lg:grid-cols-2 lg:px-8 px-6 pt-4 pb-20">
        <div className="py-6 lg:flex flex-col lg:items-end">
          <select name="education" id="" className="border border-gray-400 w-full lg:w-80 p-2 rounded-md text-sm" onChange={handleChange}>
            <option value="Select">Pilih Pendidikan</option>
            {educations.length > 0 &&
              educations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.educationLevel}
                </option>
              ))}
          </select>
        </div>

        <div className="lg:p-6">
          <div className="">
            {testTypes.length > 0 &&
              testTypes
                .filter((data) => data.educationId == education)
                .map((item) => (
                  <div key={item.id} onClick={() => handleTesType(item.id)} className={`${item.id == testType ? 'bg-sky-600 text-white' : 'bg-sky-300'} cursor-pointer p-2 rounded-md`}>
                    <div>{item.testName}</div>
                    <div className={`text-xs ${item.id == testType ? 'text-gray-300' : 'text-gray-500'}`}>Harga Rp{item.price}</div>
                  </div>
                ))}
            <div className="w-full py-2 cursor-pointer">
              <div className="bg-sky-300 p-2 rounded-md">
                <div>Tes Pembelajaran</div>
                <div className="text-xs text-gray-500">Harga Rp300.000</div>
              </div>
            </div>
            <div className="w-full py-2 cursor-pointer">
              <div className="bg-sky-300 p-2 rounded-md">
                <div>Tes Pembelajaran</div>
                <div className="text-xs text-gray-500">Harga Rp300.000</div>
              </div>
            </div>
            <div className="w-full py-2 cursor-pointer">
              <div className="bg-sky-300 p-2 rounded-md">
                <div>Tes Pembelajaran</div>
                <div className="text-xs text-gray-500">Harga Rp300.000</div>
              </div>
            </div>
            <div className="w-full py-2 cursor-pointer">
              <div className="bg-sky-300 p-2 rounded-md">
                <div>Tes Pembelajaran</div>
                <div className="text-xs text-gray-500">Harga Rp300.000</div>
              </div>
            </div>
            <div className="w-full py-2 cursor-pointer">
              <div className="bg-sky-300 p-2 rounded-md">
                <div>Tes Pembelajaran</div>
                <div className="text-xs text-gray-500">Harga Rp300.000</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 lg:bottom-0 px-6 lg:px-8 w-full text-center">
        <div onClick={handleCreateBookingTest} className="cursor-pointer bg-sky-500 px-4 py-1 rounded-md">
          {isLoading ? 'Loading...' : 'Bayar'}
        </div>
      </div>

      <PopUpAlert isOpen={isPopUp} toggleModal={toggleModal}>
        {message}
      </PopUpAlert>
    </div>
  );
};

export default PsychologyTest;
