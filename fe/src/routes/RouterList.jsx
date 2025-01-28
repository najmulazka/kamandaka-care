import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Invoice from '../components/pages/invoice';

const RouterList = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterList;
