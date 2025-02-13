import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/pages/LandingPage';
import Invoice from '../components/pages/invoice';
import CalendarComponent from '../components/pages/CalendarComponent';
import DashboardClient from '../components/pages/DashboardClient';
import Konsultasi from '../components/pages/Konsultasi';
import CallbackPage from '../components/pages/CallbackPage';
import Payment from '../components/pages/Payment';
import OrderHistoryKonsultasi from '../components/pages/OrderHistoryKonsultasi';
import PsychologyTest from '../components/pages/psychologyTest';
import OrderHistoryPsychologyTest from '../components/pages/OrderHistoryPsychologyTest';
import LoginAdmin from '../components/pages/admin/LoginAdmin';
import BookingAdmin from '../components/pages/admin/BookingAdmin';
import BookingTestAdmin from '../components/pages/admin/BookingTestAdmin';
import LoginDoctor from '../components/pages/doctor/LoginDoctor';
import BookingDoctor from '../components/pages/doctor/BookingDoctor';
import BookingTestDoctor from '../components/pages/doctor/BookingTestDoctor';
import BookingTestAnswerDoctor from '../components/pages/doctor/BookingTestAnswerDoctor';
import AvailableDoctor from '../components/pages/doctor/AvailableDoctor';
import DoctorAdmin from '../components/pages/admin/DoctorAdmin';
import KonsultasiAdmin from '../components/pages/admin/KonsultasiAdmin';
import EducationAdmin from '../components/pages/admin/EducationAdmin';

const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/client" element={<DashboardClient />} />
        <Route path="/client/konsultasi" element={<Konsultasi />} />
        <Route path="/client/psychology-test" element={<PsychologyTest />} />
        <Route path="/client/payment" element={<Payment />} />
        <Route path="/client/order-history-konsultasi" element={<OrderHistoryKonsultasi />} />
        <Route path="/client/order-history-psychology-test" element={<OrderHistoryPsychologyTest />} />
        <Route path="/booking" element={<CalendarComponent />} />
        <Route path="/admin/booking" element={<BookingAdmin />} />
        <Route path="/admin/doctor" element={<DoctorAdmin />} />
        <Route path="/admin/konsultasi" element={<KonsultasiAdmin />} />
        <Route path="/admin/education" element={<EducationAdmin />} />
        <Route path="/admin/booking-test" element={<BookingTestAdmin />} />
        <Route path="/doctor/available/:id" element={<AvailableDoctor />} />
        <Route path="/doctor/booking" element={<BookingDoctor />} />
        <Route path="/doctor/booking-test" element={<BookingTestDoctor />} />
        <Route path="/doctor/booking-test/answer/:formId" element={<BookingTestAnswerDoctor />} />

        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-doctor" element={<LoginDoctor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterList;
