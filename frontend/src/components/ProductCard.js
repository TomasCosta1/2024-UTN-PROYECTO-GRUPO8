import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="link">
      <div className="card">
        <div className="imgContainer">
          <img src={product.img} className="img" />
        </div>
        <div className="textContainer">
          <p className="category">{product.category}</p>
          <p className="name">{product.name}</p>
          <p className="price">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
