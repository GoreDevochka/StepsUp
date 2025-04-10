
import React, { useState, useEffect } from 'react';  // Добавьте useEffect сюда
import Header from '../components/header';
import Slider from '../components/slider';
import CartCard from '../components/cart_card';
import './cart.css';
import apiCart from '../api/apiCart';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получить корзину при загрузке компонента
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await apiCart.getCart();
        setCartItems(response.data.items);  // Обновляем состояние корзины
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке корзины');
        setLoading(false);
      }
    };
    fetchCart();
  }, []); // Пустой массив зависимостей, чтобы вызвать только один раз

  const handleAddToCart = async (productId, size, quantity) => {
    try {
      await apiCart.addToCart(productId, size, quantity);  // Добавляем товар в корзину
      const updatedCart = await apiCart.getCart();
      setCartItems(updatedCart.data.items);  // Обновляем корзину
    } catch (err) {
      setError('Ошибка при добавлении в корзину');
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await apiCart.removeFromCart(itemId);  // Удаляем товар из корзины
      const updatedCart = await apiCart.getCart();
      setCartItems(updatedCart.data.items);  // Обновляем корзину
    } catch (err) {
      setError('Ошибка при удалении товара');
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return (
      <main>
            <Header titleId={11} />
    
    <div className="cart-page">
   
      
      <div className="cart-section">
        <h2>Ваша корзина ({cartItems.length})</h2>
        {cartItems.length > 0 ? (
          <div className="cart-items">
            {cartItems.map(item => (
              <CartCard 
              key={item.id}
              item={item}
              onRemove={() => handleRemoveFromCart(item.id)}  
              onQuantityChange={(newQty) => updateQuantity(item.id, newQty)}
            />            
            ))}
          </div>
        ) : (
          <p>Ваша корзина пуста</p>
        )}
          </div>
          <h2>Рекомендуемые товары</h2>
          <Slider onAddToCart={handleAddToCart} />
            </div>
        </main>
  );
};

export default CartPage;
