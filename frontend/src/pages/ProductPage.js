import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import Header from '../components/Header';
import Footer from '../components/Footer';


const ProductPage = () => {
  const { id } = useParams(); // Captura el id desde la URL

  return (
    <>
    <Header/>
    <div>
      <ProductDetail productId={id} />
    </div>
    <Footer/>
    </>
  );
};

export default ProductPage;
