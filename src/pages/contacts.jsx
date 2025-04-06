    import Header from '../components/header';
    import { Link } from 'react-router-dom';
    import './text_pages.css';
    
    export default function About() {
        return ( 
          <main>
            
             <Header titleId={10} />
            <div className='textpage'>
                    <div className='contacts_text'><h1>Контакты</h1>
                    <h3>Наш телефон +7 999 999 99 99</h3>
                    <h3>E-mail Stepsup@example.ru</h3>
                    <h3>Наши магазины в г.Москва находятся по адресам:</h3>
                        
Ул. Нежинская, д. 7, метро Славянский бульвар.<br></br>
                        Ул. Нахимовский проспект, д. 21, метро Нахимовский проспект.
                    </div>
                    <img src='map.png'></img>
                </div>
          
        </main>
      );
      }