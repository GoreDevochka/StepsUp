import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './modals.css';
import apiAuth from '../../api/apiAuth';

const RegisterModal = ({ onClose, showLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    password: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiAuth.register(
        formData.email,
        formData.password,
        formData.name
      );
  
      const { accessToken, user } = response.data;
  
      // Сохраняем токен и пользователя
      localStorage.setItem('token', accessToken);
      login(user, accessToken);
  
      onClose();
      window.location.href = '/account';
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.response?.data?.error || 'Ошибка регистрации');
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Регистрация</h2>
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
            type="tel"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
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
          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms">Я принимаю условия пользовательского соглашения</label>
          </div>
          <button type="submit" className="submit-btn">Зарегистрироваться</button>
          <p className="switch-modal">
            Уже есть аккаунт? <span onClick={showLogin}>Войти</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
