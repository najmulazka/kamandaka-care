import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';

const HeaderAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [isDropDownLogout, setIsDropDownLogout] = useState(false);
  const navigate = useNavigate();

  const handleOrderHistory = () => {
    setIsDropDown(!isDropDown);
  };

  const handleDropLogout = () => {
    setIsDropDownLogout(!isDropDownLogout);
  };

  const handleLogout = () => {
    CookiesStorage.remove(CookiesKey.TokenAdmin);
    navigate('/login-admin');
  };

  return (
    <header className="inset-x-0 top-0 z-50 sticky bg-white shadow print:hidden">
      <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/admin" className="">
            <span className="sr-only">Klinik Pratama Kamandaka</span>
            <img className="h-14 w-auto" src="/logo.png" alt="logo" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? 'M6 18 18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'} />
            </svg>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-10">
          <div className="text-base font-bold text-sky-500 hover:text-sky-700 relative flex cursor-pointer" onClick={handleOrderHistory}>
            Booking
            <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
            {isDropDown && (
              <div className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg">
                <Link to="/admin/booking" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Konsultasi
                </Link>
                <Link to="/admin/booking-test" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Tes Psikologi
                </Link>
              </div>
            )}
          </div>
          <Link to="/admin/konsultasi" className="text-base font-bold text-sky-500 hover:text-sky-700 relative flex cursor-pointer">
            Konsultasi
          </Link>
          <Link to="/admin/psychology-test" className="text-base font-bold text-sky-500 hover:text-sky-700 relative flex cursor-pointer">
            Tes Psikologi
          </Link>
          <Link to="/admin/education" className="text-base font-bold text-sky-500 hover:text-sky-700 relative flex cursor-pointer">
            Pendidikan
          </Link>
          <Link to="/admin/doctor" className="text-base font-bold text-sky-500 hover:text-sky-700 relative flex cursor-pointer">
            Doctor
          </Link>
          <Link to="/admin/report" className="text-base font-bold text-sky-500 hover:text-sky-700 relative flex cursor-pointer">
            Laporan
          </Link>
          <Link to="/admin/news" className="text-base font-bold text-sky-500 hover:text-sky-700 relative flex cursor-pointer">
            News
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end relative">
          <div className="text-base font-semibold text-gray-900 flex items-center cursor-pointer" onClick={handleDropLogout}>
            Admin
            <svg className="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
          {isDropDownLogout && (
            <div className="absolute right-0 top-8 px-4 py-2 bg-red-500 cursor-pointer rounded-md shadow-lg hover:bg-red-300" onClick={handleLogout}>
              Logout
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/client" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </Link>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setIsOpen(false)}>
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="-mx-3 block rounded-lg items-center text-base font-bold text-sky-500 hover:bg-gray-100" onClick={handleOrderHistory}>
                  <div className="flex items-center px-3 py-2">
                    <div>Booking</div>
                    <svg className={`size-5 ${isDropDown ? 'rotate-180' : ''} flex-none text-gray-400`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {isDropDown && (
                    <div className="w-full">
                      <Link to="/admin/booking" className="block hover:bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Konsultasi
                      </Link>
                      <Link to="/admin/booking-test" className="block hover:bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Tes Psikologi
                      </Link>
                    </div>
                  )}
                </div>
                <Link to="/admin/konsultasi" className="-mx-3 block rounded-lg px-3 py-2 flex items-center text-base font-bold text-sky-500 hover:bg-gray-100">
                  Konsultasi
                </Link>
                <Link to="/admin/psychology-test" className="-mx-3 block rounded-lg px-3 py-2 flex items-center text-base font-bold text-sky-500 hover:bg-gray-100">
                  Tes Psikologi
                </Link>
                <Link to="/admin/education" className="-mx-3 block rounded-lg px-3 py-2 flex items-center text-base font-bold text-sky-500 hover:bg-gray-100">
                  Pendidikan
                </Link>
                <Link to="/admin/doctor" className="-mx-3 block rounded-lg px-3 py-2 flex items-center text-base font-bold text-sky-500 hover:bg-gray-100">
                  Doctor
                </Link>
              </div>
              <div className="py-6">
                <Link to="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-bold text-sky-500 hover:bg-gray-50">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderAdmin;
