import Header from '../components/header';
import Product from '../components/product';
import './item_card.css';
import { useParams } from 'react-router-dom'; // Import useParams

const ItemCard = () => {
    const { targetId } = useParams(); // Extract targetId from URL
    console.log("Target ID:", targetId); // Log the targetId for debugging

    return (
        <main>
            <Header titleId={10} />
            <Product targetId={targetId} />
        </main>
    );
};

export default ItemCard;
