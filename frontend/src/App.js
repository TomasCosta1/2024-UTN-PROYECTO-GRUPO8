import React, { useState, useEffect } from 'react';
import ProductDetail from './components/ProductDetail';

import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((response) => response.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div>
      <h1>Aplicacion para Restaurant</h1>
      <p>{message}</p>
      <ProductDetail/>
    </div>
  );
}

export default App;
