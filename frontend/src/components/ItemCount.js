import React, { useState } from "react";
import '../styles/ItemCount.css';

// Componente ItemCount que recibe la función onAdd como prop, que se ejecuta al hacer click en el botón "Agregar al carrito"
const ItemCount = ({ onAdd }) => {
    const [quantity, setQuantity] = useState(1);

// Disminuir y aumentar la cantidad de productos
    const handlerSub = (e) => {
        quantity > 1 && setQuantity(quantity - 1);
    };

    const handlerAdd = (e) => {
        setQuantity(quantity + 1);
    };

    return (
        <>
            <div className="itemCountContainer">
                <div>
                    <button onClick={handlerSub} className="quantityButton">-</button>
                    <span className="quantity">{quantity}</span>
                    <button onClick={handlerAdd} className="quantityButton">+</button>
                </div>
                <button onClick={() => onAdd(quantity)} className="addToCartButton">Agregar al carrito</button>
            </div>
        </>
    )
}

export default ItemCount;