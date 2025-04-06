import logo from '/public/logo.svg';
import user from '/public/User.svg';
import cart from '/public/cart.svg';
import headerData from '../data/header_data';
import { Link } from 'react-router-dom';
import './header.css';
import Breadcrumbs from './Breadcrumbs'; // Import Breadcrumbs component


export default function Header(props) {
    const titleId = props.titleId; 
    const title = headerData.find(item => item.id === titleId)?.title || 'Default Title';

    return (
        <header>
           
            <nav className='NavFirst'>

                <div className='left'>
            <Link to="/"> Блог</Link>
            <Link to="/About"> О нас</Link>
                </div>
                <li> <Link to="/"><img src={logo} alt="Logo" /></Link></li>
                <div className='right'>
                    <li> <Link to="/"><img src={user} alt="user"></img></Link></li>
                    <li> <Link to='/Cart'><img src={cart} alt="cart"></img></Link></li>

                </div>
            </nav>
            <nav className='NavBottom'>
                    <Link to="/">Бренды</Link>
                    <Link to="/Female">Женское</Link>
                    <Link to="/Male">Мужское</Link>
                    <Link to="/Kids">Детское</Link>
                    <Link to="/Sale">Sale</Link>
            </nav>
            <Breadcrumbs /> 
            <div className='main_title'>{title}</div>
        </header>
    );
}
