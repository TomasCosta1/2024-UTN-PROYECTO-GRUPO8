import React, { useState } from "react";
import '../styles/ItemCount.css';

const ItemCount = ({ onAdd }) => {
    const [quantity, setQuantity] = useState(1);

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