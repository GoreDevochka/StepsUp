import botinki from '/public/image 1.svg';
import male from '/public/image-1.svg';
import kids from '/public/image-2.svg';
import female from '/public/image.svg';
import { Link } from 'react-router-dom';
import './main_cont.css';


export default function MainCont() {
    return (
        <div className='main_block'>
           <div className='main_img'> <img src={botinki} alt='botinki'></img></div>
            <div className="sections">
                <div className="sec">
                    <Link to='/Female'><img src={female}></img></Link>
                    <h2>Женщинам</h2>
                </div>
                <div className="sec">
                    <Link to='/Male'><img src={male}></img></Link>
                    <h2>Мужчинам</h2>
                </div>
                <div className="sec">
                    <Link to='/Kids'><img src={kids}></img></Link>
                    <h2>Детям</h2>
                </div>
            </div>
        </div>
    );
}