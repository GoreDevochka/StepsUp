import React from "react";
import BlogiData from "../data/blogi_data";
import './blog.css';
const Blog = ({ targetId }) => {
  // Найти элемент с определённым ID
  const targetCard = BlogiData.find((item) => item.id === targetId);

    return (
    <div className="blogi_card">
      {targetCard ? (
        <div className="blogi">
          <img src={targetCard.image} alt={targetCard.title} />
          <div className="title">
          <a href="#" className="blog_title">{targetCard.title}</a>
            <p className="blog_subtitle">{targetCard.description}</p>
            </div>
        </div>
      ) : (
        <p>Карточка с ID {targetId} не найдена.</p>
      )}
    </div>
  );
};

export default Blog;