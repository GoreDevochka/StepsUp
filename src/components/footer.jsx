import VK from '/public/Image 11.svg';
import YT from '/public/Image 12.svg';
import TG from '/public/Image 13.svg';

import './footer.css';
export default function Footer() {
    return (
        <footer>
            <div className="footer__container">
            <div className='columns'>
            <div className='Nav1'>
                    <li><a href='#'>Бренды</a></li>
                    <li><a href='#'>Женское</a></li>
                    <li><a href='#'>Мужское</a></li>
                    <li><a href='#'>Детское</a></li>
                    <li><a href='#'>Sale</a></li>
            </div>
            <div className='Nav2'>          
                    <li><a href='#'>О нас</a></li>
                    <li><a href='#'>Доставка</a></li>
                    <li><a href='#'>Возврат и обмен</a></li>
                    <li><a href='#'>Контакты</a></li>
                </div>
            </div>
            <div className='socials'>
                <a href='#'><img src={VK} alt='VK'></img></a>
                <a href='#'><img src={YT} alt='YT'></img></a>
                <a href='#'><img src={TG} alt='TG'></img></a>
                </div>
            </div>
        </footer>
    );
}