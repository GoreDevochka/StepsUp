import Header from './components/header'
import Footer from './components/footer'
import Main from './components/main'
import Blog from './components/blog'
import './App.css'

export default function App() {

  return (
    <div>
    <Header /> 
      <Main />
      <Blog targetId={1} />
    <Footer />
    </div>
  )
}
