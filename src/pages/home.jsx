import Header from '../components/header';
import MainCont from '../components/main_cont';
import Digest from '../components/digest';
import Blog from '../components/blog';
import { Link } from 'react-router-dom';
import './home.css';
export default function Home() {
    return ( 
      <main>
        
         <Header titleId={10} />
        <div>
      <MainCont />
      <div className="article_container">
        <div className='blogi_cards'>
          <Link to="/"><h1>Блоги</h1></Link>
          <Blog targetId={1} />
          <Blog targetId={1} />
          <Blog targetId={1} />
        </div>
        <div className='digest'>
          <Link to="/"><h1>Дайджест</h1></Link>
          <div className="digest_pics">
            <Digest targetId={1} />
            <Digest targetId={2} />
          </div>
        </div>
          </div>
          </div>
      
    </main>
  );
  }
