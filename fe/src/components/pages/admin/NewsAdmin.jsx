import { useEffect, useState } from 'react';
import HeaderAdmin from '../../fragments/HeaderAdmin';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createNews, deleteNews, getNews, updateNews } from '../../../services/news.service';
import PopUpConfirmation from '../../fragments/PopUpConfirmation';

const ArticleAdmin = () => {
  const navigate = useNavigate();
  // const fileInputRefs = useRef({});
  const [news, setNews] = useState([]);
  const [popUpInput, setPopUpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState();
  const [isProcess, setIsProcess] = useState(false);
  const [popUpConfirmationDelete, setPopUpConfirmationDelete] = useState(false);
  const [idDelete, setIdDelete] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [formInput, setFormInput] = useState({
    title: '',
    image: null,
    description: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getNews();
        setNews(response);
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
        setIsLoading(false);
        setIsProcess(false);
      }
    };

    fetchData();
  }, [refresh, navigate]);

  useEffect(() => {
    if (editData) {
      setFormInput({
        title: editData.title,
        description: editData.description,
      });
    }
    if (!popUpInput) {
      setEditData(null);
      setFormInput({
        title: '',
        image: null,
        description: '',
      });
    }
  }, [editData, popUpInput]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files.length > 0) {
      setFormInput((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsProcess(true);
      setErrorMessage('');
      const data = new FormData();
      data.append('title', formInput.title);
      data.append('description', formInput.description);
      data.append('image', formInput.image);

      if (editData) {
        await updateNews(editData.id, data);

        setEditData(null);
        setFormInput({
          title: '',
          image: null,
          description: '',
        });
      } else {
        await createNews(data);

        setFormInput({
          title: '',
          image: null,
          description: '',
        });
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
      setRefresh(!refresh);
      setIsProcess(false);
      setPopUpInput(false);
    }
  };

  const handleEdit = (news) => {
    setEditData(news);
    setPopUpInput(true);
  };

  const handleDelete = async (id) => {
    setPopUpConfirmationDelete(true);
    setIdDelete(id);
  };

  const handleDeleteYes = async () => {
    try {
      setIsProcess(true);
      await deleteNews(idDelete);
      setIdDelete('');
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
      setRefresh(!refresh);
      setIsProcess(false);
      setPopUpConfirmationDelete(false);
    }
  };

  const handleCancel = async () => {
    setIsProcess(true);
    setPopUpInput(false);
    setIdDelete('');
    setFormInput({
      title: '',
      image: null,
      description: '',
    });
    setIsProcess(false);
    setPopUpConfirmationDelete(false);
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="flex flex-col items-center p-6 px-8">
        <div className="font-semibold text-gray-900 mb-6 text-xl">MANAGE NEWS</div>
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
                  <th className="border border-gray-400 text-left p-2">title</th>
                  <th className="border border-gray-400 text-left p-2">Image</th>
                  <th className="border border-gray-400 text-left p-2">Description</th>
                  <th className="border border-gray-400 text-left p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {news.length > 0 &&
                  news.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-400 p-1">{index++}</td>
                      <td className="border border-gray-400 p-1">{item.title}</td>
                      <td className="border border-gray-400 p-1">
                        <a href={item.imageUrl} target="_blank" className="text-sky-500 font-semibold hover:text-sky-600">
                          Lihat Gambar
                        </a>
                      </td>
                      <td className="border border-gray-400 p-1">{item.description}</td>
                      <td className="border border-gray-400 w-48 p-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
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
        )}
      </div>

      <PopUpConfirmation isOpen={popUpConfirmationDelete} message="Anda yakin akan menghapus data?" process={isProcess} cancel={handleCancel} yes={isProcess ? undefined : handleDeleteYes} />

      {/* Inputan */}
      {popUpInput && (
        <div id="deleteModal" className="fixed inset-0 flex bg-gray-900 bg-opacity-50 z-50 justify-center items-center w-screen h-screen">
          <div className="relative p-4 w-full max-w-md h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
              <div
                type="button"
                onClick={isProcess ? undefined : handleCancel}
                className={`text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center ${
                  isProcess ? '' : 'hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                }`}
                data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </div>

              <div className="font-semibold">{editData ? 'Update' : 'Input'} News (resolusi gambar 16:6)</div>
              {errorMessage !== '' && <div className="text-red-500">{errorMessage}</div>}
              <form onSubmit={isProcess ? undefined : handleSubmit} className="flex flex-col space-y-2 my-4">
                <input type="text" value={formInput.title} onChange={handleChange} required name="title" placeholder="title" className="border border-gray-500 px-2 py-1 rounded-lg" />
                <input type="file" accept="image/png, image/jpeg" onChange={handleChange} required name="image" className="border border-gray-500 px-2 py-1 rounded-lg" />
                <textarea type="text" value={formInput.description} onChange={handleChange} required name="description" placeholder="description" className="border border-gray-500 px-2 py-1 rounded-lg h-48" />
                <button type="submit" className={`bg-sky-500 hover:bg-sky-700 text-white px-4 ${isProcess ? 'opacity-50 pointer-events-none' : ''} py-2 rounded-lg w-full `}>
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

export default ArticleAdmin;
