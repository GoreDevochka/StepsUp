import logo from '/public/logo.svg';
import user from '/public/User.svg';
import cart from '/public/cart.svg';
import './header.css';

export default function Header() {
    return (
        <header>
            <nav className='NavFirst'>
                <div className='left'>
            <li> <a href='#'>Блог</a></li>
            <li> <a href='#'>О нас</a></li>
                </div>
                <img src={logo} alt="Logo" />
                <div className='right'>
            <li> <a href='#'><img src={user} alt="user"></img></a></li>
            <li> <a href='#'><img src={cart} alt="cart"></img></a></li>
                </div>
            </nav>
            <nav className='NavBottom'>
                    <a href='#'>Бренды</a>
                    <a href='#'>Женское</a>
                    <a href='#'>Мужское</a>
                    <a href='#'>Детское</a>
                    <a href='#'>Sale</a>
            </nav>
        </header>
    );
}