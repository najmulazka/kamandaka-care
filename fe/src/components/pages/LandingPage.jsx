import vector from '../../assets/vector.png';

const LandingPage = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_URL}/auth/google`;
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
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Product
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Features
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Marketplace
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Company
            </a>
          </div> */}
          <div onClick={handleLogin} className="hidden lg:flex lg:justify-end bg-sky-500 p-2 rounded-lg text-base font-semibold text-gray-900 flex flex-row space-x-1 cursor-pointer">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
              </svg>
            </div>
            <div>Login</div>
          </div>
        </nav>
        {/* Mobile */}
        {/* <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </a>
              <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                  </a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Features
                  </a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Marketplace
                  </a>
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Company
                  </a>
                </div>
                <div className="py-6">
                  <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </header>

      {/* Hero */}
      {/* bg-[url(/hero.jpg)] bg-cover bg-bottom bg-no-repeat ... */}
      <div className="p-4 py-14 lg:px-20 lg:py-28 bg-sky-500 lg:grid lg:grid-cols-2 " style={{ backgroundImage: `url(${vector})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }}>
        <div className="w-4/5">
          <div className="text-7xl text-white font-bold text-left">Melayani Dengan Sepenuh Hati</div>
          <div className="lg:w-2/3 bg-white font-semibold rounded-lg mt-10 mb-10 text-gray-800 px-4 py-2">
            <div>Daftar Konsultasi Online atau Tes Psikologi Online</div>
            <hr className="m-2" />
            <div className="bg-sky-700 text-white px-6 inline-block py-2 rounded-lg">Daftar</div>
          </div>
        </div>
        <div className="hidden h-full lg:flex justify-center items-center">
          <div className="border border-gray-900 h-2/3 w-1/2">
            <img src="/logo.png" className="" alt="Gambar" />
          </div>
        </div>
      </div>

      <div className="p-4 lg:px-20 h-96">
        <div className="lg:w-full relative">
          <div className="bg-white w-full px-10 py-10 rounded-xl absolute -top-10 lg:-top-20 shadow-md">
            Layanan
          </div>
        </div>
      </div>

      {/* Visi Misi */}
      <div className="p-4 lg:px-8 items-center flex flex-col justify-center border border-gray-200 border-t-0 border-l-0 border-r-0 border-b-1">
        <div className="lg:w-3/5">
          <div className="text-sky-500 text-center lg:text-2xl text-base font-semibold">Visi</div>
          <div className=" text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quos? Molestiae dolor cum voluptatibus eius reprehenderit quos dolore quisquam harum rerum magni. Ut rem cum vel qui distinctio. Recusandae, cum.
          </div>
          <div className="text-sky-500 text-center lg:text-2xl text-base mt-4 font-semibold">Misi</div>
          <div className="text-base text-left mb-1 lg:mb-2">- Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          <div className="text-base text-left mb-1 lg:mb-2">- Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          <div className="text-base text-left mb-1 lg:mb-2">- Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          <div className="text-base text-left mb-1 lg:mb-2">- Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
          <div className="text-base text-left mb-1 lg:mb-2">- Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
