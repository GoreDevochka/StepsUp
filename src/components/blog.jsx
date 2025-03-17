import React from "react";
import BlogiData from "../data/blogi_data";

const Blog = ({ targetId }) => {
  // Найти элемент с определённым ID
  const targetCard = BlogiData.find((item) => item.id === targetId);

  return (
    <div className="blogi">
      {targetCard ? (
        <div>
          <img src={targetCard.image} alt={targetCard.title} />
          <p className="blog_title">{targetCard.title}</p>
          <p className="blog_subtitle">{targetCard.description}</p>
        </div>
      ) : (
        <p>Карточка с ID {targetId} не найдена.</p>
      )}
    </div>
  );
};

export default blog;