import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';

const ProductPage = () => {
  const { id } = useParams(); // Captura el id desde la URL

  return (
    <div>
      <ProductDetail productId={id} />
    </div>
  );
};

export default ProductPage;
