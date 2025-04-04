import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Product from './components/product'; // Import Product component
import Home from './pages/home';
import Female from './pages/female';
import Male from './pages/male';
import Kids from './pages/kids';
import Sale from './pages/sale';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/female" element={<Female />} />
        <Route path="/male" element={<Male />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/product/:targetId" element={<Product />} /> {/* Updated route to point to Product component */}
      </Routes>
      <Footer />
    </div>
  );  
}
