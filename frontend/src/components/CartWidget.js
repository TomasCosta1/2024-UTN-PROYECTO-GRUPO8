import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/CartWidget.css";

const CartWidget = () => {
  const { total } = useContext(CartContext);
  return (
    <Link to="/cart" className="widget">
      <p>Ver pedido (${total})</p>
    </Link>
  );
};

export default CartWidget;
