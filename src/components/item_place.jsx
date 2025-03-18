import ItemData from "../data/item_data";
import Item from "./item";
import './item_place.css';

const ItemPlace =  ({ sortOption, selectedCategory }) => {
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
    }
    return 0; // No sorting
  });
    
      return (
              <div className="item_place">
                  <div className="place">
                      {sortedData.map(item => ( 
                          <Item key={item.id} targetId={item.id} />
                      ))}
                  </div>
              </div>
      );
    };
    
    export default ItemPlace;