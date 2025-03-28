import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEducations } from '../../services/education.service';
import { getTestTypes } from '../../services/testType.service';
import { createBookingTest, getBookingTestClient } from '../../services/bookingTest.service';
import { getBookingsClient } from '../../services/booking.service';
import PopUpAlert from '../fragments/PopUpAlert';
import { toast } from 'react-toastify';

const PsychologyTest = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [education, setEducation] = useState('');
  const [educations, setEducations] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [testType, setTestType] = useState('');
  const [isProcess, setIsProcess] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getEducations();
        setEducations(data);

        const types = await getTestTypes();
        setTestTypes(types);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/');
        } else if (err.status == 400) {
          toast.warn(err.response.data.err);
        } else if (err.status == 500) {
          toast.error('Aplikasi Error Silahkan Hubungi Developer');
        } else {
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
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
    try {
      setIsProcess(!isProcess);
      const response = await getBookingsClient();
      const check = response.find((item) => item.isValidate === null);

      const response1 = await getBookingTestClient();
      const check1 = response1.find((item) => item.isValidate === null);
      if (testType == '') {
        setMessage('Silahkan pilih jenis tes terlebih dahulu');
        setIsPopUp(true);
      } else if (check === undefined && check1 === undefined) {
        let bookingTest = await createBookingTest({ testTypeId: testType });
        navigate(`/client/order-history-psychology-test/payment/${bookingTest.id}`);
      } else {
        setTestType('');
        setMessage('Maaf masih terdapat proses booking yang belum di bayar atau belum divalidasi oleh admin');
        setIsPopUp(true);
      }
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        toast.warn('Please Login Now');
        navigate('/');
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
    setTestType('');
    setIsPopUp(false);
  };

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <div className="lg:grid grid-cols-2 ">
          <div className="min-h-screen relative">
            <div className="pl-6 pt-6 lg:p-4 lg:px-8 rounded-md flex">
              <Link to="/client">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                </svg>
              </Link>
            </div>

            <div className="w-full flex font-semibold justify-center text-gray-900">Pilih Jenis Tes</div>
            <div className="lg:px-8 px-6 pt-4 pb-10">
              <div className="py-6 lg:flex flex-col lg:items-center">
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
                <div className="flex flex-col space-y-2">
                  {testTypes.length > 0 &&
                    testTypes
                      .filter((data) => data.educationId == education)
                      .map((item) => (
                        <div key={item.id} onClick={() => handleTesType(item.id)} className={`${item.id == testType ? 'bg-[#35c9ce] border border-black' : 'bg-[#9ddbdd] hover:bg-[#75cfd2]'} cursor-pointer p-2 rounded-md`}>
                          <div className="font-semibold">{item.testName}</div>
                          <div className={`${item.id == testType ? 'text-gray-700' : 'text-xm text-gray-500'}`}>{item.description}</div>
                          <div className={`text-xs text-gray-500`}>Harga Rp{item.price}</div>
                        </div>
                      ))}
                </div>
              </div>
            </div>

            <div className="mb-6 lg:mb-10 px-6 lg:px-8 w-full text-center">
              <div onClick={!isProcess ? handleCreateBookingTest : undefined} className={`cursor-pointer bg-[#29ADB2] hover:bg-[#21878b] px-4 py-1 rounded-md ${isProcess ? 'opacity-50 pointer-events-none' : ''}`}>
                {isProcess ? 'Loading...' : 'Bayar'}
              </div>
            </div>
          </div>
          <div className="hidden lg:block min-h-screen">
            <img src="/test.jpg" className="h-full object-cover" alt="" />
          </div>
        </div>
      )}
      <PopUpAlert isOpen={isPopUp} toggleModal={toggleModal}>
        {message}
      </PopUpAlert>
    </div>
  );
};

export default PsychologyTest;
