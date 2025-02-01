import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Invoice from '../components/pages/invoice';
import CalendarComponent from '../components/pages/CalendarComponent';

const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/booking" element={<CalendarComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterList;
