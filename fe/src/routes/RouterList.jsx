import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/pages/LandingPage';
import Invoice from '../components/pages/invoice';
import CalendarComponent from '../components/pages/CalendarComponent';
import DashboardClient from '../components/pages/DashboardClient';
import Konsultasi from '../components/pages/Konsultasi';
import CallbackPage from '../components/pages/CallbackPage';
import Payment from '../components/pages/Payment';
import OrderHistory from '../components/pages/OrderHistory';

const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/client" element={<DashboardClient />} />
        <Route path="/client/konsultasi" element={<Konsultasi />} />
        <Route path="/client/payment" element={<Payment />} />
        <Route path="/client/order-history" element={<OrderHistory />} />
        <Route path="/booking" element={<CalendarComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterList;
