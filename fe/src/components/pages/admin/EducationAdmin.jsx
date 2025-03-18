import { useEffect, useState } from 'react';
import HeaderAdmin from '../../fragments/HeaderAdmin';
import { useNavigate } from 'react-router-dom';
import { createEducation, deleteEducation, getEducations, updateEducation } from '../../../services/education.service';
import PopUpConfirmation from '../../fragments/PopUpConfirmation';
import { toast } from 'react-toastify';

const EducationAdmin = () => {
  const navigate = useNavigate();
  const [educations, setEducations] = useState([]);
  const [popUpConfirmationDelete, setPopUpConfirmationDelete] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [editData, setEditData] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [popUpInput, setPopUpInput] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    educationLevel: '',
  });
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getEducations();
        setEducations(response);
        setIsLoading(false);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
        if (err.status == 400) {
          toast.warn(err.response.data.err);
          setIsProcess(false);
        }
      }
    };
    fetchData();
  }, [refresh, navigate]);

  useEffect(() => {
    if (editData) {
      setFormData({
        educationLevel: editData.educationLevel,
        price: editData.price,
        doctorId: editData.doctorId,
      });
    }
    if (!popUpInput) {
      setEditData(null);
      setFormData({
        educationLevel: '',
      });
    }
  }, [editData, popUpInput]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcess(true);
    setErrorMessage('');
    const data = {
      educationLevel: e.target.educationLevel?.value,
    };

    if (editData) {
      try {
        await updateEducation(editData.id, data);
        setRefresh(!refresh);
        setEditData(null);
        setFormData({
          educationLevel: '',
        });
        setPopUpInput(false);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/login-admin');
        }
        if (err.status == 400) {
          toast.warn(err.response.data.err);
          setIsProcess(false);
        }
      }
    } else {
      try {
        await createEducation(data);
        setRefresh(!refresh);
        setFormData({
          educationLevel: '',
        });
        setPopUpInput(false);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          toast.warn('Please Login Now');
          navigate('/login-admin');
        }
        if (err.status == 400) {
          toast.warn(err.response.data.err);
          setIsProcess(false);
        }
      }
    }
    setIsProcess(false);
  };

  const handleEdit = (education) => {
    setEditData(education);
    setPopUpInput(true);
  };

  const handleDelete = async (id) => {
    setPopUpConfirmationDelete(true);
    setIdDelete(id);
  };

  const handleDeleteYes = async () => {
    try {
      setIsProcess(true);
      await deleteEducation(idDelete);
      setIdDelete('');
      setRefresh(!refresh);
      setIsProcess(false);
      setPopUpConfirmationDelete(false);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login-admin');
      }
    }
  };

  const handleCancel = async () => {
    setIsProcess(true);
    setPopUpInput(false);
    setIdDelete('');
    setFormData({
      educationLevel: '',
    });
    setIsProcess(false);
    setPopUpConfirmationDelete(false);
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="flex flex-col items-center p-6 px-8">
        <div className="font-semibold text-gray-900 mb-6 text-xl">MANAGE PENDIDIKAN</div>
        {isLoading ? (
          'Loading...'
        ) : (
          <div className="w-full">
            <div className="w-full text-right">
              <button
                type="button"
                onClick={() => setPopUpInput(true)}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Tambah +
              </button>
            </div>
            <table className="border-collapse border border-gray-400 w-full">
              <thead className="bg-sky-300">
                <tr>
                  <th className="border border-gray-400 w-5 text-left p-2">No</th>
                  <th className="border border-gray-400 text-left p-2">Tingkat Pendidikan</th>
                  <th className="border border-gray-400 text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {educations.length > 0 &&
                  educations.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-400 p-1">{index++}</td>
                      <td className="border border-gray-400 p-1">{item.educationLevel}</td>
                      <td className="border border-gray-400 w-48 p-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <PopUpConfirmation isOpen={popUpConfirmationDelete} process={isProcess} message="Anda yakin akan menghapus data?" cancel={handleCancel} yes={isProcess ? undefined : handleDeleteYes} />

      {/* Inputan */}
      {popUpInput && (
        <div id="deleteModal" className="fixed inset-0 flex bg-gray-900 bg-opacity-50 z-50 justify-center items-center w-screen h-screen">
          <div className="relative p-4 w-full max-w-md h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <div className="font-semibold">{editData ? 'Update' : 'Input'} data pendidikan</div>
              {errorMessage !== '' && <div className="text-red-500">{errorMessage}</div>}
              <form onSubmit={isProcess ? undefined : handleSubmit} className="flex flex-col space-y-2 my-4">
                <input type="text" value={formData.educationLevel} onChange={handleChange} required name="educationLevel" placeholder="Nama Layanan Konsultasi" className="border border-gray-500 px-2 py-1 rounded-lg" />
                <button type="submit" className={`bg-sky-500 hover:bg-sky-700 ${isProcess ? 'opacity-50 pointer-events-none' : ''} text-white px-4 py-2 rounded-lg w-full`}>
                  {isProcess ? 'Loading...' : editData ? 'Update' : 'Simpan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationAdmin;
