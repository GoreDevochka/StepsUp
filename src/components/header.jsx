import logo from '/logo.svg?url';
import user from '/User.svg?url';
import cart from '/Cart.svg?url';
import headerData from '../data/header_data';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import RegisterModal from './modals/RegisterModal';
import LoginModal from './modals/LoginModal';
import './header.css';
import Breadcrumbs from './Breadcrumbs';

export default function Header(props) {
    const navigate = useNavigate();
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { cart } = useCart();
    const titleId = props.titleId; 
    const title = headerData.find(item => item.id === titleId)?.title || 'Default Title';

    return (
        <>
            <header>
                <nav className='NavFirst'>
                    <div className='left'>
                        <Link to="/"> Блог</Link>
                        <Link to="/About"> О нас</Link>
                    </div>
                    <li> <Link to="/"><img src={logo} alt="Logo" /></Link></li>
                    <div className='right'>
                        <li> <button 
                            onClick={() => setShowLoginModal(true)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            <img src={user} alt="user" />
                        </button></li>
                        <li> 
                            <Link to='/Cart'>
                                <img src={cart} alt="cart"></img>
                                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                            </Link>
                        </li>
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
            {showRegisterModal && (
                <RegisterModal 
                    onClose={() => setShowRegisterModal(false)}
                    showLogin={() => {
                        setShowRegisterModal(false);
                        setShowLoginModal(true);
                    }}
                />
            )}
            {showLoginModal && (
                <LoginModal 
                    onClose={() => setShowLoginModal(false)}
                    showRegister={() => {
                        setShowLoginModal(false);
                        setShowRegisterModal(true);
                    }}
                />
            )}
        </>
    );
}
