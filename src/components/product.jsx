import React, { useState } from "react";
import ItemData from "../data/item_data";
import Header from '../components/header';
import { useParams } from 'react-router-dom';
import './product.css';
import Slider from "./slider";

const Product = () => {
  const { targetId } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  const targetCard = ItemData.find((item) => item.id === Number(targetId));

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  if (!targetCard) {
    return <p>Товар не найден.</p>;
  }

  return (
    <main>
      <Header titleId={10} />
      <div className="product">
        <div className="product__image">
          <div className="product_image">
            <img src={targetCard.image} id="main-product-image" />
          </div>
          <div className="additionalImages">
            {[targetCard.additionalImage1, targetCard.additionalImage2, 
              targetCard.additionalImage3, targetCard.additionalImage4]
              .filter(img => img)
              .map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  onMouseEnter={() => document.getElementById('main-product-image').src = img}
                  onClick={() => document.getElementById('main-product-image').src = img}
                />
              ))}
          </div>
        </div>
        <div className="text_place">
          <div className="product_text">
            <h2><p className="product_title">{targetCard.title}</p></h2>
            <h3><p className="product_subtitle">{targetCard.description}</p></h3>
            <h1><p className="product_coast">{targetCard.coast}</p></h1>
          </div>
          
          <div className="sizes">
            <h3>Выберите размер:</h3>
            <div className="size-buttons">
              {['38', '39', '40'].map(size => (
                <button
                  key={size}
                  className={selectedSize === size ? 'active' : ''}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="add_tocart">
            <button
              onClick={() => selectedSize && alert(`Товар "${targetCard.title}" (размер: ${selectedSize}) добавлен в корзину`)}
              disabled={!selectedSize}
            >
              {selectedSize ? 'В корзину' : 'Выберите размер'}
            </button>
          </div>

          {/* Accordion Section */}
          <div className="product-accordion">
            <div className={`accordion-item ${activeTab === 'description' ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleTab('description')}>
                Описание
              </div>
              {activeTab === 'description' && (
                <div className="accordion-content">
                  {targetCard.fullDescription || 'Подробное описание товара'}
                </div>
              )}
            </div>
            
            <div className={`accordion-item ${activeTab === 'specs' ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleTab('specs')}>
                Характеристики
              </div>
              {activeTab === 'specs' && (
                <div className="accordion-content">
                  {targetCard.specifications || 'Технические характеристики товара'}
                </div>
              )}
            </div>
            
            <div className={`accordion-item ${activeTab === 'delivery' ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleTab('delivery')}>
                Доставка
              </div>
              {activeTab === 'delivery' && (
                <div className="accordion-content">
                  Информация о способах и сроках доставки
                </div>
              )}
            </div>
            
            <div className={`accordion-item ${activeTab === 'payment' ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleTab('payment')}>
                Оплата
              </div>
              {activeTab === 'payment' && (
                <div className="accordion-content">
                  Способы оплаты и условия возврата
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Slider/>
    </main>
  );
};

export default Product;
