import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './modals.css';
import apiAuth from '../../api/apiAuth';

const LoginModal = ({ onClose, showRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [successMessage, ] = useState(null); // Состояние для сообщения об успешном входе
  const [errorMessage, ] = useState(null); // Состояние для сообщения об ошибке

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiAuth.login(formData.email, formData.password);

      
      // Логируем весь ответ от сервера, чтобы понять, что приходит
      console.log(response.data); // Выводим данные из ответа
  
      const { accessToken, user } = response.data;
  
      // Сохраняем токен как строку
      localStorage.setItem('token', JSON.stringify(accessToken));  // Сохраняем токен как строку
      login(user, accessToken);
      
      onClose();
      window.location.href = '/account';
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.error || 'Ошибка входа');
    }
  };
  
  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Вход</h2>
        
        {/* Если есть сообщение об успехе, показываем его */}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        {/* Если есть сообщение об ошибке, показываем его */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Электронная почта"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">Войти</button>
          <p className="switch-modal">
            Нет аккаунта? <span onClick={showRegister}>Зарегистрироваться</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
