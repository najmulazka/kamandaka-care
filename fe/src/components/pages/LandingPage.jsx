import { useEffect, useState } from 'react';
import vector from '../../assets/vector.png';
import { Link } from 'react-router-dom';
import { getNews } from '../../services/news.service';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [news, setNews] = useState({});
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_URL}/auth/google`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNews();
      setNews(response);
    };
    fetchData();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? news.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === news.length - 1 ? 0 : prevIndex + 1));
  };

  const handleNews = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div>
      <header className="sticky z-50 top-0 bg-white shadow-md">
        <nav className="mx-auto flex items-center justify-between p-4 lg:px-20" aria-label="Global">
          <div className="flex">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-14 w-auto" src="/logo.png" alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button type="button" onClick={() => setIsOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-2">
            <a href="#" className="text-sm/6 font-semibold text-gray-900 hover:bg-[#29ADB2] px-4 py-1 rounded-md">
              Home
            </a>
            <a href="#news" className="text-sm/6 font-semibold text-gray-900 hover:bg-[#29ADB2] px-4 py-1 rounded-md">
              Berita
            </a>
            <a href="#layanan" className="text-sm/6 font-semibold text-gray-900 hover:bg-[#29ADB2] px-4 py-1 rounded-md">
              Layanan
            </a>
            <a href="#kontak" className="text-sm/6 font-semibold text-gray-900 hover:bg-[#29ADB2] px-4 py-1 rounded-md">
              Kontak
            </a>
          </div>
          <div className="hidden lg:block opacity-0">.</div>
          {/* <Link
            to={'/login-doctor'}
            className="hidden lg:flex lg:justify-end bg-[#29ADB2] border border-[#29ADB2] hover:bg-white hover:text-[#29ADB2] p-2 rounded-lg text-base font-semibold text-gray-800 flex flex-row space-x-1 cursor-pointer">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
              </svg> 
            </div>
            <div>Login Dokter</div>
          </Link> */}
        </nav>

        {/* Mobile */}
        {isOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10"></div>
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-10 w-auto" src="/logo.png" alt="" />
                </a>
                <button type="button" onClick={() => setIsOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                  <span className="sr-only">Close menu</span>
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <a href="#" onClick={() => setIsOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Home
                    </a>
                    <a href="#newss" onClick={() => setIsOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Berita
                    </a>
                    <a href="#layanan" onClick={() => setIsOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Layanan
                    </a>
                    <a href="#kontak" onClick={() => setIsOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Kontak
                    </a>
                  </div>
                  {/* <div className="py-6">
                    <Link to={'/login-doctor'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                      Login Dokter
                    </Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      {/* bg-[url(/hero.jpg)] bg-cover bg-bottom bg-no-repeat ... */}
      <div className=" bg-[#29ADB2] lg:grid lg:grid-cols-2 " style={{ backgroundImage: `url(${vector})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'left' }}>
        <div className="p-4 pt-14 lg:py-0 lg:px-20 lg:pt-16">
          <div className="text-3xl lg:text-6xl text-white font-bold text-left leading-snug">Kesehatan Anda, Prioritas Kami</div>
          <div className=" text-white font-semibold text-left mt-4">Klinik Pratama Kamandaka siap menjadi mitra kesehatan Anda dengan pelayanan yang ramah, cepat, dan berkualitas.</div>
          <div className="lg:w-2/3 bg-white font-semibold rounded-lg mt-10 mb-10 text-gray-800 px-4 py-2">
            <div>Tersedia Konsultasi Online atau Tes Psikologi Online</div>
            <hr className="m-2" />
            <div className="flex space-x-6">
              <div className="bg-[#29ADB2] border border-[#29ADB2] text-white px-6 inline-block py-2 rounded-lg cursor-pointer hover:bg-white hover:text-[#29ADB2]" onClick={handleLogin}>
                Daftar
              </div>
              <div className="bg-[#29ADB2] border border-[#29ADB2] text-white px-6 inline-block py-2 rounded-lg cursor-pointer hover:bg-white hover:text-[#29ADB2]" onClick={handleLogin}>
                Masuk
              </div>
            </div>
          </div>
          {/* banner mobile*/}
          <div id="newss" className="lg:hidden flex justify-center items-center relative">
            <button onClick={prevSlide} className="absolute left-1 lg:left-24 z-10 text-white p-1 rounded-full shadow-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 lg:w-14 lg:h-14" fill="rgba(255,255,255,0.57)">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
            </button>
            <div className="lg:w-full relative overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {news.length > 0 &&
                  news.map((item, index) => (
                    <div key={index} className="min-w-full flex justify-center relative cursor-pointer" onClick={() => handleNews(item.id)}>
                      <div className="bg-white w-full rounded-xl shadow-md overflow-hidden relative">
                        <img src={item.imageUrl} alt={`Banner ${index + 1}`} className="rounded-xl w-full object-cover" />
                        <div className="absolute inset-0 flex bg-black bg-opacity-40 text-white text-xl font-bold">
                          <div className="absolute bottom-2 lg:bottom-6 left-2 lg:left-6 text-xl line-clamp-2">{item.title}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <button onClick={nextSlide} className="absolute right-1 lg:right-24 z-10 text-white p-1 rounded-full shadow-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 lg:w-14 lg:h-14" fill="rgba(255,255,255,0.57)">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden h-full lg:flex justify-center items-center">
          <div className="w-1/2">
            <img src="/doctor-hero.png" className="" alt="Gambar" />
          </div>
        </div>
      </div>

      {/* news desktop*/}
      <div id="news" className="p-4 hidden lg:flex w-full lg:px-20 justify-center items-center relative">
        <button onClick={prevSlide} className="absolute left-5 lg:left-24 z-10 text-white p-1 rounded-full shadow-md hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 lg:w-14 lg:h-14" fill="rgba(255,255,255,0.57)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
          </svg>
        </button>
        <div className="lg:w-full relative overflow-hidden rounded-xl">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {news.length > 0 &&
              news.map((item, index) => (
                <div key={index} className="min-w-full flex justify-center relative cursor-pointer" onClick={() => handleNews(item.id)}>
                  <div className="bg-white w-full shadow-md overflow-hidden relative">
                    <img src={item.imageUrl} alt={`Banner ${index + 1}`} className="rounded-xl w-full" />
                    <div className="absolute inset-0 flex bg-black bg-opacity-25 hover:bg-opacity-50 text-white text-xl font-bold">
                      <div className="absolute bottom-2 lg:bottom-6 left-2 lg:left-6 lg:text-5xl line-clamp-2">{item.title}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <button onClick={nextSlide} className="absolute right-5 lg:right-24 z-10 text-white p-1 rounded-full shadow-md hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 lg:w-14 lg:h-14" fill="rgba(255,255,255,0.57)">
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </button>
      </div>

      {/* LAYANAN */}
      <div id="layanan" className="p-4 lg:px-20 min-h-[400px]">
        <div className="lg:w-full ">
          <div className="bg-white w-full p-4 lg:px-10 lg:py-10 rounded-xl border border-gray-200 shadow-md">
            <div className="mb-2">Layanan Kami</div>
            {/* <div className="text-3xl font-bold text-[#29ADB2] mb-4">Layanan Klinik Pratama Kamandaka</div>
            <div className="lg:grid grid-cols-3">
              <ListLayanan img="/psychologi-consultation.jpg">Poli Umum</ListLayanan>
              <ListLayanan img="/psychologi-consultation.jpg">Poli Gigi</ListLayanan>
              <ListLayanan img="/psychologi-consultation.jpg">Poli Psikologi</ListLayanan>
              <ListLayanan img="/psychologi-consultation.jpg">Tumbuh Kembang Anak</ListLayanan>
              <ListLayanan img="/psychologi-consultation.jpg">Terapi Wicara</ListLayanan>
              <ListLayanan img="/psychologi-consultation.jpg">Terapi Okupasi</ListLayanan>
              <ListLayanan img="/psychologi-consultation.jpg">Khitan</ListLayanan>
            </div> */}

            <div className="text-3xl font-bold text-[#29ADB2] mb-4">Layanan Online Klinik Pratama Kamandaka</div>
            <div className="lg:grid grid-cols-3">
              <ListLayanan img="/test.jpg" title="Tes Psikologi">
                Evaluasi untuk mengukur aspek kepribadian, kecerdasan, emosi, dan perilaku seseorang.
              </ListLayanan>
              <ListLayanan img="/psychologi-consultation.jpg" title="Konsultasi Psikologi">
                Mengatasi masalah mental, emosional, dan menemukan solusi terbaik bagi kesejahteraan Anda.
              </ListLayanan>
              <ListLayanan img="/general-doctor-consultation.jpg" title="Konsultasi Dokter Umum">
                Membantu diagnosis, pengobatan, dan pencegahan berbagai kondisi kesehatan untuk menjaga kesejahteraan Anda.
              </ListLayanan>
              <ListLayanan img="/consultation.jpg" title="Konsultasi Terapi">
                Membantu mengatasi masalah emosional, mental, atau fisik melalui pendekatan profesional untuk meningkatkan kualitas hidup.
              </ListLayanan>
              <ListLayanan img="/dental-consultation.jpg" title="Konsultasi Dokter Gigi">
                Pemeriksaan, perawatan, dan pencegahan masalah kesehatan gigi dan mulut.
              </ListLayanan>
              <ListLayanan img="/drug-consultation.jpg" title="Konsultasi Obat">
                Membantu memahami penggunaan, dosis, dan efek samping obat untuk pengobatan yang aman dan efektif.
              </ListLayanan>
              {/* <div className="col-span-3 m-6 flex flex-row flex justify-center">
                <div className="border border-[#29ADB2] p-4 bg-[#29ADB2] rounded-lg font-semibold cursor-pointer hover:bg-white text-center" onClick={handleLogin}>
                  Daftar Konsultasi atau Tes Psikologi Online
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Visi Misi */}
      <div className="p-4 lg:px-20 items-center flex flex-col justify-center border border-gray-200 border-t-0 border-l-0 border-r-0 border-b-1">
        <div className="">
          <div className="text-[#29ADB2] text-center lg:text-2xl text-base font-semibold">Visi</div>
          <div className="text-base text-center">Menjadi Pusat Pelayanan Terapi Profesional Tingkat Nasional pada tahun 2030.</div>
          <div className="text-[#29ADB2] text-center lg:text-2xl text-base mt-4 font-semibold">Misi</div>
          <div className="text-base text-left mb-1 lg:mb-2">1. Sebagai tempat masyarakat untuk mengkonsultasikan masalah kesehatan yang mereka alami khususnya pelayanan terapi.</div>
          <div className="text-base text-left mb-1 lg:mb-2">2. Sebagai mitra Pemerintah dalam memberikan pelayanan prefentif dan kuratif serta rehabilitatif.</div>
          <div className="text-base text-left mb-1 lg:mb-2">3. Sebagai wujud pengabdian pada masyarakat dengan ikut serta dalam usaha warga untuk meningkatkan derajad kesejahteraan melalui peningkatan kesehatan.</div>
          <div className="text-base text-left mb-1 lg:mb-2">4. Menjalankan pengobatan sesuai prosedur, berkualitas dan dapat terjangkau oleh semua kalangan masyarakat.</div>
          <div className="text-base text-left mb-1 lg:mb-2">5. Memberikan pelayanan medis dasar yang berbasis Murah Terjangkau</div>
        </div>
      </div>

      {/* STRUKTUR ORGANISASI */}
      <div className="p-4 lg:px-20 items-center flex flex-col justify-center border border-gray-200 border-t-0 border-l-0 border-r-0 border-b-1">
        <div className="">
          <div className="text-[#29ADB2] text-center lg:text-2xl text-base font-semibold mb-2">Struktur Organisasi</div>
          <div>
            <img src="/structure.png" alt="" />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div id="kontak" className="p-4 lg:px-20 py-10 text-gray-800 bg-[#29ADB2] lg:grid grid-cols-3 gap-8 border border-gray-200 border-t-0 border-l-0 border-r-0 border-b-1">
        <div className="flex flex-col space-y-2 col-span-2">
          <div className="font-semibold">Informasi</div>
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="text-gray-800 fill-current w-4">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z"></path>
            </svg>

            <div className="flex flex-col">
              <div>Senin – Sabtu (Minggu atau hari Besar Tutup)</div>
              <div>Pukul 08.00 – 12.00 dan 16.00 – 20.00</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className='w-8 lg:w-4'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="text-gray-800 fill-current">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
            </svg>
            </div>
            

            <div>
              <a
                className="hover:text-white"
                target="_blank"
                href="https://www.google.com/maps/place/Klinik+Pratama+Kamandaka/@-7.4085807,109.2204295,17z/data=!3m1!4b1!4m6!3m5!1s0x2e655f0013cc3cc3:0xb18ff0f531b06827!8m2!3d-7.4085807!4d109.2204295!16s%2Fg%2F11vz77ymm1?entry=ttu&g_ep=EgoyMDI1MDIxOC4wIKXMDSoASAFQAw%3D%3D">
                Jl. Kamandaka Bobosan RT02/02 Kec.Purwokerto Utara Kab. Banyumas, Jawa Tengah 53127, Indonesia
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="text-gray-800 w-4 fill-current">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z"></path>
            </svg>

            <div>
              Via Whatsapp&nbsp;
              <a href="https://wa.me/+6287844760789" target="_blank" className="hover:text-white">
                087844760789
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="text-gray-800 w-4 fill-current">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
            </svg>

            <div>
              <a href="mailto:klinikkamandaka@gmail.com" className="hover:text-white">
                klinikkamandaka@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="my-6 lg:my-0">
          <div className="font-semibold">Tautan Lainya</div>
          <Link to={'/syarat-ketentuan'} className="hover:text-white">
            Kebijakan dan Privasi
          </Link>
        </div>
        <hr className="m-4" />
        <div className="text-center">
          Copyright &copy; 2025. Klinik Pratama Kamandaka. All Rights Reserved by{' '}
          <a className="hover:text-white" target="_blank" href="https://najmulazka.github.io/web-profile/">
            najmulazka
          </a>
        </div>
      </div>
    </div>
  );
};

function ListLayanan(props) {
  const { img, children, title } = props;
  return (
    <div className="border border-[#29ADB2] p-4 m-2 flex flex-row rounded-md space-x-4 align-center items-center">
      <div className="max-w-16">
        <img src={img} alt="" className="rounded-full" />
      </div>
      <div>
        <div className="font-bold">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default LandingPage;
