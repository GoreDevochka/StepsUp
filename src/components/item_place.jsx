import ItemData from "../data/item_data";
import Item from "./item";
import './item_place.css';
import { useState } from 'react';

const ItemPlace =  ({ sortOption }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const parseDate = (description) => {
    const dateMatch = description.match(/(\d{2}\.\d{2}\.\d{4})/);
    return dateMatch ? new Date(dateMatch[0].split('.').reverse().join('-')) : null;
  };

  const filteredData = selectedCategory 
        ? ItemData.filter(item => item.category === selectedCategory) 
        : ItemData;

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOption === 'по цене (дороже)') {
        return b.coast - a.coast; // Assuming coast is a number
    } else if (sortOption === 'по цене (дешевле)') {
        return a.coast - b.coast; // Assuming coast is a number
    } else if (sortOption === 'по алфавиту') { 
        return a.title.localeCompare(b.title); // Assuming title is a string
    } else if (sortOption === 'по дате (новое)') {
        return parseDate(b.description) - parseDate(a.description); // Sort by publication date, new to old
    } else if (sortOption === 'по дате (старое)') {
        return parseDate(a.description) - parseDate(b.description); // Sort by publication date, old to new
    }
    return 0; // No sorting
  });

  return (
        <div className="item_place">
            <div className="category-buttons">
                <button onClick={() => setSelectedCategory('кроссовки')}>Кроссовки</button>
                <button onClick={() => setSelectedCategory('кеды')}>Кеды</button>
                <button onClick={() => setSelectedCategory('ботинки')}>Ботинки</button>
            </div>
            <div className="place"> 
                {sortedData.map(item => ( 
                    <Item key={item.id} targetId={item.id} />
                ))}
            </div>
        </div>
  );
};

export default ItemPlace;
