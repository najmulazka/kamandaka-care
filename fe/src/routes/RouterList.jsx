import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/pages/LandingPage';
import Invoice from '../components/pages/Invoice';
import CalendarComponent from '../components/pages/CalendarComponent';
import DashboardClient from '../components/pages/DashboardClient';
import Konsultasi from '../components/pages/Konsultasi';
import CallbackPage from '../components/pages/CallbackPage';
import Payment from '../components/pages/Payment';
import OrderHistoryKonsultasi from '../components/pages/OrderHistoryKonsultasi';
import PsychologyTest from '../components/pages/PsychologyTest';
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
import BookingKonsultasiAdmin from '../components/pages/admin/BookingKonsultasiAdmin';
import EducationAdmin from '../components/pages/admin/EducationAdmin';
import PsychologyTestAdmin from '../components/pages/admin/PsychologyTestAdmin';
import { Protected, ProtectedClient, ProtectedDoctor } from '../utils/protected';
import SyaratKetentuan from '../components/pages/SyaratKetentuan';
import ReportAdmin from '../components/pages/admin/ReportAdmin';

const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/syarat-ketentuan" element={<SyaratKetentuan />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route
          path="/client"
          element={
            <ProtectedClient>
              <DashboardClient />
            </ProtectedClient>
          }
        />
        <Route
          path="/client/konsultasi"
          element={
            <ProtectedClient>
              <Konsultasi />
            </ProtectedClient>
          }
        />
        <Route
          path="/client/psychology-test"
          element={
            <ProtectedClient>
              <PsychologyTest />
            </ProtectedClient>
          }
        />
        <Route
          path="/client/payment"
          element={
            <ProtectedClient>
              <Payment />
            </ProtectedClient>
          }
        />
        <Route
          path="/client/order-history-konsultasi"
          element={
            <ProtectedClient>
              <OrderHistoryKonsultasi />
            </ProtectedClient>
          }
        />
        <Route
          path="/client/order-history-psychology-test"
          element={
            <ProtectedClient>
              <OrderHistoryPsychologyTest />
            </ProtectedClient>
          }
        />
        <Route path="/booking" element={<CalendarComponent />} />
        <Route
          path="/admin/booking"
          element={
            <Protected>
              {' '}
              <BookingAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/add-booking-konsultasi"
          element={
            <Protected>
              <BookingKonsultasiAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/doctor"
          element={
            <Protected>
              <DoctorAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/konsultasi"
          element={
            <Protected>
              <KonsultasiAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/psychology-test"
          element={
            <Protected>
              <PsychologyTestAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/education"
          element={
            <Protected>
              <EducationAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/booking-test"
          element={
            <Protected>
              <BookingTestAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/report"
          element={
            <Protected>
              <ReportAdmin />
            </Protected>
          }
        />
        <Route
          path="/doctor/available/:id"
          element={
            <ProtectedDoctor>
              <AvailableDoctor />
            </ProtectedDoctor>
          }
        />
        <Route
          path="/doctor/booking"
          element={
            <ProtectedDoctor>
              <BookingDoctor />
            </ProtectedDoctor>
          }
        />
        <Route
          path="/doctor/booking-test"
          element={
            <ProtectedDoctor>
              <BookingTestDoctor />
            </ProtectedDoctor>
          }
        />
        <Route
          path="/doctor/booking-test/answer/:id"
          element={
            <ProtectedDoctor>
              <BookingTestAnswerDoctor />
            </ProtectedDoctor>
          }
        />

        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/login-doctor" element={<LoginDoctor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterList;
