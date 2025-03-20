import React from "react";
import ItemData from "../data/item_data";
import { Link } from 'react-router-dom'; // Import Link component

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
            <Link to={`/item_card/${targetId}`} className="item_title">{targetCard.title}</Link>

            <p className="item_coast">{targetCard.coast}</p>
            </div>
        </div>
      ) : (
        <p>Карточка с ID {targetId} не найдена.</p>
      )}
    </div>
  );
};

export default Item;
