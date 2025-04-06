import Header from '../components/header';
import { Link } from 'react-router-dom';
import './text_pages.css';

export default function About() {
    return ( 
      <main>
        
         <Header titleId={10} />
            <div className='textpage'>
                <h1> История компании </h1>
            Компания «StepsUP» была основана в 2015 году. С тех пор  мы стремимся предложить нашим клиентам только лучшие  модели кроссовок со всего мира. Наша история началась с  небольшой розничной точки, и теперь мы активно  развиваемся в онлайн-продажах.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae fringilla felis, ac viverra ante. Phasellus iaculis, ipsum non suscipit vulputate, odio arcu volutpat nibh, vitae accumsan augue ligula eget augue. Maecenas at ligula in velit pulvinar porttitor non eget nulla. Curabitur eu molestie neque. Vestibulum porttitor quis tellus eu mollis. Cras in tincidunt tellus. Morbi at efficitur est.
                <h1> Наши партнеры</h1>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae fringilla felis, ac viverra ante. Phasellus iaculis, ipsum non suscipit vulputate, odio arcu volutpat nibh, vitae accumsan augue ligula eget augue. Maecenas at ligula in velit pulvinar porttitor non eget nulla. Curabitur eu molestie neque. Vestibulum porttitor quis tellus eu mollis. Cras in tincidunt tellus. Morbi at efficitur est.
                 <h1>Наши сотрудники</h1>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae fringilla felis, ac viverra ante. Phasellus iaculis, ipsum non suscipit vulputate, odio arcu volutpat nibh, vitae accumsan augue ligula eget augue. Maecenas at ligula in velit pulvinar porttitor non eget nulla. Curabitur eu molestie neque. Vestibulum porttitor quis tellus eu mollis. Cras in tincidunt tellus. Morbi at efficitur est.
   
                </div>
      
    </main>
  );
  }
