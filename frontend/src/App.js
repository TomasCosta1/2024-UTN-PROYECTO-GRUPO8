import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeAdminPage from './pages/HomeAdminPage';
import ProductsAdminPage from './pages/ProductsAdminPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import CartPage from "./pages/CartPage";
import PaymentPage from './pages/PaymentPage';
import ClientOrderPage from './pages/OrderPage';
import EndDayPage from './pages/EndDayPage';
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <Router>
      <CartProvider>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<HomeAdminPage />} />
          <Route path="/admin/Products" element={<ProductsAdminPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/clientOrder' element={<ClientOrderPage />} />
          <Route path='/endDay' element={<EndDayPage />} />
        </Routes>

      </div>
      </CartProvider>
    </Router>
  );
};

export default App;
