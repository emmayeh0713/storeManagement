import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './productPage.css';

const MemberManagement = () => {
  const [members, setMembers] = useState([
    { name: '張三', phone: '0987654321', photo: '' },
    { name: '李四', phone: '0976543210', photo: '' },
    { name: '王五', phone: '0965432109', photo: '' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember({
      ...currentMember,
      [name]: value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentMember({
          ...currentMember,
          photo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = () => {
    setMembers([...members, currentMember]);
    setCurrentMember(null);
    setShowModal(false);
  };

  const handleEditMember = (index) => {
    setCurrentMember({ ...members[index], index });
    setShowModal(true);
  };

  const handleUpdateMember = () => {
    const updatedMembers = members.map((member, index) =>
      index === currentMember.index ? currentMember : member
    );
    setMembers(updatedMembers);
    setCurrentMember(null);
    setShowModal(false);
  };

  const handleDeleteMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  return (
    <div className="member-management">
      <h1>會員管理</h1>
      <button onClick={() => navigate('/register')}>新增會員</button>
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>電話</th>
            <th>照片</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.phone}</td>
              <td>
                {member.photo ? <img src={member.photo} alt="會員照片" style={{ width: '50px', height: '50px' }} /> : '無照片'}
              </td>
              <td>
                <button onClick={() => handleEditMember(index)}>編輯</button>
                <button onClick={() => handleDeleteMember(index)}>刪除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{currentMember.index !== undefined ? '編輯會員' : '新增會員'}</h2>
            <label>姓名:</label>
            <input type="text" name="name" value={currentMember.name} onChange={handleChange} />
            <label>電話:</label>
            <input type="text" name="phone" value={currentMember.phone} onChange={handleChange} />
            <label>照片:</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {currentMember.photo && <img src={currentMember.photo} alt="會員照片" style={{ width: '100px', height: '100px' }} />}
            <button onClick={currentMember.index !== undefined ? handleUpdateMember : handleAddMember}>確認</button>
          </div>
        </div>
      )}

      <button  onClick={() => navigate('/dashboard')}>返回</button>
    </div>
  );
};

export default MemberManagement;
