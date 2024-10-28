import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />  /*tengo que sacarle el footer y el Header*/
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

      </div>
    </Router>
  );
};

export default App;
