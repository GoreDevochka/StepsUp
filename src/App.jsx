import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Footer from './components/footer';
import Product from './components/product';
import Home from './pages/home';
import AccountPage from './pages/account';
import Female from './pages/female';
import Male from './pages/male';
import Kids from './pages/kids';  
import Sale from './pages/sale';
import About from './pages/about';
import Delivery from './pages/delivery';
import Return from './pages/return';
import Contacts from './pages/contacts';
import Cart from './pages/cart';

<<<<<<< HEAD

export default function App() {
=======
function App() {
>>>>>>> b33e7eed2db9af412258056e8bb1f6a1ab9237c9
  return (
    <CartProvider>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/female" element={<Female />} />
            <Route path="/male" element={<Male />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/about" element={<About />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/return" element={<Return />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:targetId" element={<Product />} />
            <Route path="/account" element={<AccountPage isAuthenticated={false} />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
