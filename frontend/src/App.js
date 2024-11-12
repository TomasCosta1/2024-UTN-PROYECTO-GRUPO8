import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeAdminPage from './pages/HomeAdminPage';
import ProductsAdminPage from './pages/ProductsAdminPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import CartPage from "./pages/CartPage";
import RegisterPage from "./pages/RegisterPage";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <Router>
      <CartProvider>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />  /tengo que sacarle el footer y el Header/
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<HomeAdminPage />} />
          <Route path="/admin/Products" element={<ProductsAdminPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

      </div>
      </CartProvider>
    </Router>
  );
};

export default App;