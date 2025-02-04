import { Link } from 'react-router-dom';
import HeaderClient from '../fragments/HeaderClient';

const DashboardClient = () => {
  
  return (
    <div className="bg-white h-screen">
      <HeaderClient />
      <div className="flex justify-center mt-40 space-x-6">
        <Link to="/client/konsultasi" className="h-16 w-36 bg-blue-300 flex items-center justify-center rounded-md cursor-pointer">
          Konsultasi
        </Link>
        <Link to="/tes-psikologi" className="h-16 w-36 bg-blue-300 flex items-center justify-center rounded-md cursor-pointer">
          Tes Pesikologi
        </Link>
      </div>
    
    </div>
  );
};

export default DashboardClient;
