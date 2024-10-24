import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import '../styles/CartWidget.css';

const CartWidget = () => {
    const { qty } = useContext(CartContext);
    return (
        <div className="widget">
            <Link to="/cart">
                <p>Imagen Carrito</p>
            </Link>
            <p>{qty}</p>
        </div>
    )
};

export default CartWidget;