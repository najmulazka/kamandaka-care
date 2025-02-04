import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/pages/LandingPage';
import Invoice from '../components/pages/invoice';
import CalendarComponent from '../components/pages/CalendarComponent';
import DashboardClient from '../components/pages/DashboardClient';
import Konsultasi from '../components/pages/Konsultasi';

const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/booking" element={<CalendarComponent />} />
        <Route path="/client" element={<DashboardClient />} />
        <Route path="/client/konsultasi" element={<Konsultasi />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterList;
