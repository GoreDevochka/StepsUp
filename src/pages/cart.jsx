import React, { useState } from 'react';
import Header from '../components/header';
import Slider from '../components/slider';
import CartCard from '../components/cart_card';
import './cart.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? {...i, quantity: i.quantity + 1} : i
        );
      }
      return [...prevItems, {...item, quantity: 1}];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      )
    );
  };

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
                onRemove={() => removeFromCart(item.id)}
                onQuantityChange={(newQty) => updateQuantity(item.id, newQty)}
              />
            ))}
          </div>
        ) : (
          <p>Ваша корзина пуста</p>
        )}
          </div>
          <h2>Рекомендуемые товары</h2>
      <Slider onAddToCart={addToCart} />
            </div>
        </main>
  );
};

export default CartPage;
