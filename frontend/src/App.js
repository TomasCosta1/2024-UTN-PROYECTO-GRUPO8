import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeAdminPage from './pages/HomeAdminPage';
import ProductsAdminPage from './pages/ProductsAdminPage';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<HomeAdminPage />} />
          <Route path="/admin/Products" element={<ProductsAdminPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
