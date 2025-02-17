import { useEffect, useState } from 'react';
import HeaderAdmin from '../../fragments/HeaderAdmin';
import { useNavigate } from 'react-router-dom';
import { createService, deleteService, getServices, updateService } from '../../../services/service.service';
import PopUpConfirmation from '../../fragments/PopUpConfirmation';
import { getDoctors } from '../../../services/doctor.service';

const KonsultasiAdmin = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editData, setEditData] = useState();
  const [formData, setFormData] = useState({
    serviceName: '',
    price: '',
    doctorId: '',
  });
  console.log(formData);
  const [errorMessage, setErrorMessage] = useState('');
  const [popUpConfirmationDelete, setPopUpConfirmationDelete] = useState(false);
  const [popUpInput, setPopUpInput] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [refresh, setRefresh] = useState(false);
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServices();
        setServices(response);

        setDoctors(await getDoctors());
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    };
    fetchData();
  }, [refresh, navigate]);

  useEffect(() => {
    if (editData) {
      console.log(editData);
      setFormData({
        serviceName: editData.serviceName,
        price: editData.price,
        doctorId: editData.doctorId,
      });
    }
    if (!popUpInput) {
      setEditData(null);
      setFormData({
        serviceName: '',
        price: '',
        doctorId: '',
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
    setErrorMessage('');
    const data = {
      serviceName: e.target.serviceName?.value,
      price: e.target.price?.value,
      doctorId: e.target.doctorId?.value,
    };

    if (editData) {
      try {
        if (data.doctorId == 'Select') {
          setErrorMessage('Silahkan pilih dokter terlebih dahulu');
        } else {
          await updateService(editData.id, data);
          setRefresh(!refresh);
          setEditData(null);
          setFormData({
            serviceName: '',
            price: '',
            doctorId: '',
          });
          setPopUpInput(false);
        }
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    } else {
      try {
        if (data.doctorId == 'Select') {
          setErrorMessage('Silahkan pilih dokter terlebih dahulu');
        } else {
          await createService(data);
          setRefresh(!refresh);
          setFormData({
            serviceName: '',
            price: '',
            doctorId: '',
          });
          setPopUpInput(false);
        }
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    }
  };

  const handleEdit = (service) => {
    setEditData(service);
    setPopUpInput(true);
  };

  const handleDelete = async (id) => {
    setPopUpConfirmationDelete(true);
    setIdDelete(id);
  };

  const handleDeleteYes = async () => {
    await deleteService(idDelete);
    setPopUpConfirmationDelete(false);
    setIdDelete('');
    setRefresh(!refresh);
  };

  const handleCancel = async () => {
    setPopUpConfirmationDelete(false);
    setPopUpInput(false);
    setIdDelete('');
    setFormData({
      serviceName: '',
      price: '',
      doctorId: '',
    });
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="flex flex-col items-center p-6 px-8">
        <div className="font-semibold text-gray-900 mb-6 text-xl">MANAGE KONSULTASI</div>
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
              <th className="border border-gray-400 text-left p-2">Nama Layanan</th>
              <th className="border border-gray-400 text-left p-2">Harga</th>
              <th className="border border-gray-400 text-left p-2">Dokter</th>
              <th className="border border-gray-400 text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 &&
              services.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-400 p-1">{index++}</td>
                  <td className="border border-gray-400 p-1">{item.serviceName}</td>
                  <td className="border border-gray-400 p-1">{item.price}</td>
                  <td className="border border-gray-400 p-1">{item.doctors.fullName}</td>
                  <td className="border border-gray-400 w-48 p-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleEdit(item);
                      }}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <PopUpConfirmation isOpen={popUpConfirmationDelete} message="Anda yakin akan menghapus data?" cancel={handleCancel} yes={handleDeleteYes} />

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

              <div className="font-semibold">{editData ? 'Update' : 'Input'} Layanan Konsultasi</div>
              {errorMessage !== '' && <div className="text-red-500">{errorMessage}</div>}
              <form onSubmit={handleSubmit} className="flex flex-col space-y-2 my-4">
                <input type="text" value={formData.serviceName} onChange={handleChange} required name="serviceName" placeholder="Nama Layanan Konsultasi" className="border border-gray-500 px-2 py-1 rounded-lg" />
                <input type="number" value={formData.price} onChange={handleChange} required name="price" placeholder="Harga" className="border border-gray-500 appearance-none no-spinner px-2 py-1 rounded-lg" />
                <select name="doctorId" required value={formData.doctorId} onChange={handleChange} className="border border-gray-500 px-2 py-1 rounded-lg">
                  <option value="Select">Pilih Dokter</option>
                  {doctors.length > 0 &&
                    doctors.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.fullName}
                      </option>
                    ))}
                </select>
                <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-lg w-full">
                {editData ? 'Update' : 'Simpan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KonsultasiAdmin;
