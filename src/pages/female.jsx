import Header from '../components/header';
import ItemPlace from '../components/item_place';
import './female.css';
import { useState } from 'react';

const Female = () => {
    const [selectedSortOption, setSelectedSortOption] = useState('по цене (дороже)');

    return (
        <main>
            <Header titleId={2} />
            <div className='sort'>
                <select onChange={(e) => setSelectedSortOption(e.target.value)} value={selectedSortOption}>
                    <option value="по цене (дороже)">По цене (дороже)</option>
                    <option value="по цене (дешевле)">По цене (дешевле)</option>
                    <option value="по дате (новое)">По дате (новое)</option>
                    <option value="по дате (старое)">По дате (старое)</option>
                    <option value="по алфавиту">По алфавиту</option>
                </select>
<ItemPlace sortOption={selectedSortOption} />
                
                </div>
        </main>
 
    );
};

export default Female;
