import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerPage.css';

const RegisterMember = () => {
  const [member, setMember] = useState({ name: '', phone: '', photo: '' });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleStartCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Error accessing the camera: ", err));
  };

  const handleCapturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const photo = canvasRef.current.toDataURL('image/png');
    setMember({ ...member, photo });
  };

  const handleSubmit = () => {
    // 保存會員信息並跳轉回會員管理頁面
    // 這裡假設有一個 handleAddMember 的方法來保存會員信息
    // 可以通過 props 或 context 將該方法傳遞進來
    // 這裡簡單地模擬一下保存並跳轉
    console.log('Member registered:', member);
    navigate('/member');
  };

  return (
    <div className="register-member">
      <h1>註冊會員</h1>
      <label>姓名:</label>
      <input type="text" name="name" value={member.name} onChange={handleChange} />
      <label>電話:</label>
      <input type="text" name="phone" value={member.phone} onChange={handleChange} />
      <div>
        <button onClick={handleStartCamera}>開啟攝影機</button>
       

      </div>
      <div>
      <video ref={videoRef} width="320" height="240" autoPlay></video>
      <button onClick={handleCapturePhoto}>拍照</button>
      </div>
      <div>
      <canvas ref={canvasRef} width="320" height="240" style={{ display: 'none' }}></canvas>
      {member.photo && <img src={member.photo} alt="會員照片" />}
      <button onClick={handleSubmit}>確認</button>
      </div>
    </div>
  );
};

export default RegisterMember;
