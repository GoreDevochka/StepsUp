import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './account.css';

const AccountPage = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  if (!isAuthenticated) {
    return (
      <div className="account-container">
        <h2>Личный кабинет</h2>
        <button className="login-btn" onClick={() => window.location.href = '/account'}>Войти</button>
      </div>
    );
  }

  return (
    <div className="account-container">
      <h2>Личный кабинет</h2>
      
      <div className="user-info">
        <h3>Основная информация</h3>
        <p><strong>Имя:</strong> {user?.name || 'Не указано'}</p>
        <p><strong>Email:</strong> {user?.email || 'Не указан'}</p>
        <p><strong>Телефон:</strong> {user?.phone || 'Не указан'}</p>
        <p><strong>Пароль:</strong> ********</p>
      </div>

      <div className="order-history">
        <h3>История заказов</h3>
        <table>
          <thead>
            <tr>
              <th>Номер заказа</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#12345</td>
              <td>01.01.2023</td>
              <td>5 000 ₽</td>
              <td>Доставлен</td>
            </tr>
            <tr>
              <td>#12346</td>
              <td>15.01.2023</td>
              <td>3 500 ₽</td>
              <td>В обработке</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="logout-btn" onClick={logout}>Выйти</button>
    </div>
  );
};

export default AccountPage;
