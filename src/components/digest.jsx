import React from "react";
import './digest.css';
import DigestData from "../data/digest_data";
const Digest = ({ targetId }) => {
  // Найти элемент с определённым ID
  const targetCard = DigestData.find((item) => item.id === targetId);

    return (
    <div className="digest_card">
      {targetCard ? (
        <div className="digest_pics">
                    <img src={targetCard.image} alt={targetCard.title} />
        </div>
      ) : (
        <p>Карточка с ID {targetId} не найдена.</p>
      )}
    </div>
  );
};

export default Digest;