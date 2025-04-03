import React, { useState } from "react";
import ItemData from "../data/item_data";
import { useParams } from 'react-router-dom'; // Import useParams
import './product.css';

const Product = () => {
  const { targetId } = useParams(); // Get targetId from URL
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size

  console.log("Retrieved targetId:", targetId); // Log targetId
  const targetCard = ItemData.find((item) => item.id === Number(targetId)); // Convert targetId to number

  if (!targetCard) {
    return <p>Товар не найден.</p>; // Display message if product is not found
  }

  // If product is found, display its details
  return (
    <div className="product">
      <div className="product_image">
        <img src={targetCard.image} />
        <div className="product_text">
          <h2><p className="product_title">{targetCard.title}</p></h2>
          <h3><p className="product_subtitle">{targetCard.description}</p></h3>
          <h1><p className="product_coast">{targetCard.coast}</p></h1>
        </div>
        <div className="sizes">
          <h3>Выберите размер:</h3>
          <div className="size-buttons">
            <button onClick={() => setSelectedSize('38')}>38</button>
            <button onClick={() => setSelectedSize('39')}>39</button>
            <button onClick={() => setSelectedSize('40')}>40</button>
          </div>
        </div>
        <div className="add_tocart">
          <button className="add_to_cart_button" onClick={() => console.log(`Добавлено в корзину размер: ${selectedSize}`)}>В корзину</button>
        </div>
      </div>
    </div>
  );
};

export default Product;