import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/pages/LandingPage';
import DashboardClient from '../components/pages/DashboardClient';
import Konsultasi from '../components/pages/Konsultasi';
import CallbackPage from '../components/pages/CallbackPage';
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
import NewsAdmin from '../components/pages/admin/NewsAdmin';
import News from '../components/pages/news';
import PaymentPsychologyTest from '../components/pages/PaymentPsychologyTest';
import PaymentKonsultasi from '../components/pages/PaymentKonsultasi';
import NotFound from '../components/pages/NotFound';
import DashboardAdmin from '../components/pages/admin/DashboardAdmin';

const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/news/:id" element={<News />} />
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
          path="/client/order-history-konsultasi"
          element={
            <ProtectedClient>
              <OrderHistoryKonsultasi />
            </ProtectedClient>
          }
        />
        <Route
          path="/client/order-history-konsultasi/payment/:id"
          element={
            <ProtectedClient>
              <PaymentKonsultasi />
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
        <Route
          path="/client/order-history-psychology-test/payment/:id"
          element={
            <ProtectedClient>
              <PaymentPsychologyTest />
            </ProtectedClient>
          }
        />
        <Route
          path="/admin"
          element={
            <Protected>
              <DashboardAdmin />
            </Protected>
          }
        />
        <Route
          path="/admin/booking"
          element={
            <Protected>
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
          path="/admin/news"
          element={
            <Protected>
              <NewsAdmin />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterList;
