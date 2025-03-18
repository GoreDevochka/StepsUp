import React from "react";
import ItemData from "../data/item_data";
import './item.css';
const Item = ({ targetId }) => {
  // Найти элемент с определённым ID
  const targetCard = ItemData.find((item) => item.id === targetId);

    return (
    <div className="item_card">
      {targetCard ? (
        <div className="items">
          <img src={targetCard.image} alt={targetCard.title} />
          <div className="item_titles">
          <a href="#" className="item_title">{targetCard.title}</a>
            <p className="item_subtitle">{targetCard.description}</p>
            </div>
        </div>
      ) : (
        <p>Карточка с ID {targetId} не найдена.</p>
      )}
    </div>
  );
};

export default Item;