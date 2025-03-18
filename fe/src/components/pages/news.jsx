import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getNews, getNewsDetail } from '../../services/news.service';
import { toast } from 'react-toastify';

const News = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState({});
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNewsDetail(id);
        setNewsDetail(response);

        const responses = await getNews();
        setNews(responses);
      } catch (err) {
        toast.warn(err.response.data.err);
      }
    };

    fetchData();
  }, [id]);

  const handleNews = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div className="lg:px-20 p-4">
      <div className="rounded-md">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
          </svg>
        </Link>

        <div className="w-full flex font-semibold justify-center text-gray-900 mb-6 text-3xl lg:text-4xl">{newsDetail.title}</div>
        <div>
          <img src={`${newsDetail.imageUrl}`} alt="" className="mb-6 rounded-md" />
        </div>
        <div className="lg:grid grid-cols-3">
          <div className="indent-8 text-justify col-span-2">{newsDetail.description}</div>
          <div className="flex items-center flex-col">
            <div className="lg:w-3/4 bg-white border border-[#29ADB2] shadow shadow-[#29ADB2] shadow-md font-semibold rounded-lg mt-6 lg:mt-10 mb-6 lg:mb-10 text-gray-800 px-4 py-2">
              <div>Tersedia Konsultasi Online atau Tes Psikologi Online</div>
              <hr className="m-2" />
              <div className="flex space-x-6">
                <div className="bg-[#29ADB2] border border-[#29ADB2] text-white px-6 inline-block py-2 rounded-lg cursor-pointer hover:bg-white hover:text-[#29ADB2]">Daftar</div>
                <div className="bg-[#29ADB2] border border-[#29ADB2] text-white px-6 inline-block py-2 rounded-lg cursor-pointer hover:bg-white hover:text-[#29ADB2]">Masuk</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 mt-6 lg:grid grid-cols-2 gap-4">
          {news.length > 0 &&
            news
              .filter((item) => item.id != id)
              .map((item, index) => (
                <div key={index} className={`w-full h-36 relative rounded-md overflow-hidden mb-4`} onClick={() => handleNews(item.id)}>
                  <img src={item.imageUrl} alt="" className="absolute" />
                  <div className="bg-black bg-opacity-25 hover:bg-opacity-50 hover:cursor-pointer h-full absolute w-full">
                    <div className="absolute bottom-2 left-2 text-white font-semibold line-clamp-2">{item.title}</div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default News;
