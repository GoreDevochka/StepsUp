import React, { useState } from 'react';
import './slider.css';
import ItemData from '../data/item_data';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(ItemData.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const visibleItems = ItemData.slice(
    currentIndex * itemsPerSlide,
    (currentIndex + 1) * itemsPerSlide
  );

  return (
    <div className="slider-container">
      <button className="slider-button prev" onClick={prevSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="rgba(148, 44, 44, 0.322)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <div className="slider">
        {visibleItems.map((item, index) => (
          <div key={index} className="product-card">
            <img src={item.image} alt={item.title} />
            <div className="product-info">
              <h3>{item.title}</h3>
              <p className="price">{item.coast}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="slider-button next" onClick={nextSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="rgba(148, 44, 44, 0.322)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default Slider;
