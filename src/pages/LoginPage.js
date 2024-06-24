import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';  // 确保样式正确应用，如果有单独样式文件可以换成该组件相关的CSS文件

function LoginPage() {
    const navigate = useNavigate();
  
  
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // 可以在這裡添加密碼驗證邏輯
      navigate('/dashboard');
    };
  
    
  
    return (
    <div className="App">
        <header className="App-header">
        <h1>獵人雜貨店後臺管理</h1>
        </header>
        <div className="input-container">
            <form onSubmit={handleSubmit}>
            <label>
                請輸入密碼以進入
            
            </label>
            <input 
                type="password" 
                id="password" 
                
                placeholder="請輸入密碼"
                />
            <button type="submit">確認</button>
            </form>
        </div>
    </div>
    );
  }

  export default LoginPage;