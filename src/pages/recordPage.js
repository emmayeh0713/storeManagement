// src/PurchaseRecord.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productPage.css';

const PurchaseRecord = () => {
  const [records, setRecords] = useState([
    { date: '2024-05-16T14:30:00', buyer: '張三', amount: 500, method: '信用卡', details: '商品1, 商品2' },
    { date: '2024-05-15T11:00:00', buyer: '李四', amount: 800, method: '現金', details: '商品3' },
    { date: '2024-05-14T09:15:00', buyer: '王五', amount: 1200, method: '信用卡', details: '商品4, 商品5' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecord({
      ...currentRecord,
      [name]: value
    });
  };

  const handleAddRecord = () => {
    setRecords([...records, currentRecord]);
    setCurrentRecord(null);
    setShowModal(false);
  };

  const handleEditRecord = (index) => {
    setCurrentRecord({ ...records[index], index });
    setShowModal(true);
  };

  const handleUpdateRecord = () => {
    const updatedRecords = records.map((record, index) =>
      index === currentRecord.index ? currentRecord : record
    );
    setRecords(updatedRecords);
    setCurrentRecord(null);
    setShowModal(false);
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  return (
    <div className="purchase-record">
      <h1>消費紀錄管理</h1>
      <button onClick={() => { setCurrentRecord({ date: '', buyer: '', amount: '', method: '', details: '' }); setShowModal(true); }}>新增紀錄</button>
      <table>
        <thead>
          <tr>
            <th>時間</th>
            <th>購買人</th>
            <th>訂單金額</th>
            <th>交易方式</th>
            <th>訂單細項</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{new Date(record.date).toLocaleString()}</td>
              <td>{record.buyer}</td>
              <td>{record.amount}</td>
              <td>{record.method}</td>
              <td>{record.details}</td>
              <td>
                <button onClick={() => handleEditRecord(index)}>編輯</button>
                <button onClick={() => handleDeleteRecord(index)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{currentRecord.index !== undefined ? '編輯紀錄' : '新增紀錄'}</h2>
            <label>時間:</label>
            <input type="datetime-local" name="date" value={currentRecord.date} onChange={handleChange} />
            <label>購買人:</label>
            <input type="text" name="buyer" value={currentRecord.buyer} onChange={handleChange} />
            <label>訂單金額:</label>
            <input type="number" name="amount" value={currentRecord.amount} onChange={handleChange} />
            <label>交易方式:</label>
            <input type="text" name="method" value={currentRecord.method} onChange={handleChange} />
            <label>訂單細項:</label>
            <input type="text" name="details" value={currentRecord.details} onChange={handleChange} />
            <button onClick={currentRecord.index !== undefined ? handleUpdateRecord : handleAddRecord}>確認</button>
          </div>
        </div>
      )}

      <button  onClick={() => navigate('/dashboard')}>返回</button>
    </div>
  );
};

export default PurchaseRecord;
