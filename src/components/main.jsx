import botinki from '/public/image 1.svg';
import male from '/public/image-1.svg';
import kids from '/public/image-2.svg';
import female from '/public/image.svg';
import './main.css';


export default function Header() {
    return (
        <div className='main_block'>
           <div className='main_img'> <img src={botinki} alt='botinki'></img></div>
            <div className="sections">
                <div className="sec">
                    <a href='#'><img src={female}></img></a>
                    <h1>Женщинам</h1>
                </div>
                <div className="sec">
                    <a href='#'><img src={male}></img></a>
                    <h1>Мужчинам</h1>
                </div>
                <div className="sec">
                    <a href='#'><img src={kids}></img></a>
                    <h1>Детям</h1>
                </div>
            </div>
        </div>
    );
}