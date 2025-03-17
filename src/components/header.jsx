import logo from '/public/logo.svg';
import user from '/public/User.svg';
import cart from '/public/cart.svg';

import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
    return (
        <header>
            <nav className='NavFirst'>
                <div className='left'>
            <Link to="/"> Блог</Link>
            <Link to="/"> О нас</Link>
                </div>
                <img src={logo} alt="Logo" />
                <div className='right'>
                    <li> <Link to="/"><img src={user} alt="user"></img></Link></li>
                    <li> <Link to='#'><img src={cart} alt="cart"></img></Link></li>

                </div>
            </nav>
            <nav className='NavBottom'>
                    <Link to="/">Бренды</Link>
                    <Link to="/female">Женское</Link>
                    <Link to="/">Мужское</Link>
                    <Link to="/">Детское</Link>
                    <Link to="/">Sale</Link>
            </nav>
        </header>
    );
}
