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
                    <li><Link to='#'>Женское</Link></li>
                    <li><Link to='#'>Мужское</Link></li>
                    <li><Link to='#'>Детское</Link></li>
                    <li><Link to='#'>Sale</Link></li>
                </ul>

            </div>
            <div className='Nav2'>          
                <ul>
                    <li><Link to='#'>О нас</Link></li>
                    <li><Link to='#'>Доставка</Link></li>
                    <li><Link to='#'>Возврат и обмен</Link></li>
                    <li><Link to='#'>Контакты</Link></li>
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
