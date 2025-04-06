import VK from '/public/Image 11.svg';
import YT from '/public/Image 12.svg';
import TG from '/public/Image 13.svg';
import { Link } from 'react-router-dom';
import './footer.css';
export default function Footer() {
    return (
        <footer>
            <div className="footer__container">
            <div className='columns'>
            <div className='Nav1'>
                <ul>
                    <li><Link to='#'>Бренды</Link></li>
                    <li><Link to='/Female'>Женское</Link></li>
                    <li><Link to='/Male'>Мужское</Link></li>
                    <li><Link to='/Kids'>Детское</Link></li>
                    <li><Link to='/Sale'>Sale</Link></li>
                </ul>

            </div>
            <div className='Nav2'>          
                <ul>
                    <li><Link to='/About'>О нас</Link></li>
                    <li><Link to='/Delivery'>Доставка</Link></li>
                    <li><Link to='/Return'>Возврат и обмен</Link></li>
                    <li><Link to='/Contacts'>Контакты</Link></li>
                </ul>

                </div>
            </div>
            <div className='socials'>
                <Link to='#'><img src={VK} alt='VK'></img></Link>
                <Link to='#'><img src={YT} alt='YT'></img></Link>
                <Link to='#'><img src={TG} alt='TG'></img></Link>
                </div>
            </div>
        </footer>
    );
}
