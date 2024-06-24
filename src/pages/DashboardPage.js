import React from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css'; 

function DashboardPage() {
    const navigate = useNavigate();
    return (
      <div className="App">
        <header className="App-header">
        <h1>獵人雜貨店後臺管理</h1>
        </header>
        <div className="input-container">
            <h2>請選擇管理項目</h2>
            <div className="button-container">
            <button onClick={() => navigate('/product')}>商品管理</button>
            <button onClick={() => navigate('/member')}>會員管理</button>
            <button onClick={() => navigate('/record')}>消費紀錄</button>
            </div>
        </div>
      </div>
    );
  }

  
export default DashboardPage;