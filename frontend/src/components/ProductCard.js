import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
    <div>
      <div>
        <img src={product.img} />
      </div>
      <div>
        <p>{product.name}</p>
        <p>{product.category}</p>
        <p>${product.price}</p>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;