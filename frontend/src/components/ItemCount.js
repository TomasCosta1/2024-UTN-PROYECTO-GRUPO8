import React, { useState } from "react";

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
            <div>
                <div>
                    <button onClick={handlerSub}>-</button>
                    <span>{quantity}</span>
                    <button onClick={handlerAdd}>+</button>
                </div>
                <button onClick={() => onAdd(quantity)}>Agregar al carrito</button>
            </div>
        </>
    )
}

export default ItemCount;