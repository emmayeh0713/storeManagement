import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from  './pages/DashboardPage';
import Product from './pages/productPage'; 
import PurchaseRecord from './pages/recordPage'; 
import MemberManagement from './pages/memberPage'; 
import RegisterMember from './pages/RegisterMemberPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/member" element={<MemberManagement />} />
        <Route path="/register" element={<RegisterMember />} />
        <Route path="/record" element={<PurchaseRecord />} />
        
      </Routes>
    </Router>
  );
}




export default App;
