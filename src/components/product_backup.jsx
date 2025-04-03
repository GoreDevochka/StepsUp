import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import ItemData from "../data/item_data";
import { CartContext } from "../context/CartContext"; // Import CartContext
import './product.css';

const Tovar = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = ItemData.find(item => item.id === parseInt(id)); // Find the product by ID
  const { addToCart } = useContext(CartContext); // Access addToCart function from context

  const handleAddToCart = () => {
      addToCart(product); // Add the product to the cart
  };

  if (!product) {
    return <p>Товар не найден.</p>; 
  }

  return (
    <div>
      <div className='opisanie_tovara_container'>
        <h1>{product.title}</h1>
        <div className='opisanie_tovara'>
          <div className='photo_tovara'>
              <img src={product.image} alt={product.title} />
          </div>
          <div className='harakteristiki_tovara'>
            <p>Цена: {product.coast} руб.</p>
            <p>{product.description}</p>
            <button className='buttonb' onClick={handleAddToCart}>добавить в корзину</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tovar; // Change export to match component name
