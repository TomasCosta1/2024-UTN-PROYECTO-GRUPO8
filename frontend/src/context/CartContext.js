import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let firstQty = 0;
    cart.forEach((product) => {
      firstQty += product.qty;
    });
    setQty(firstQty);
  }, [cart]);

  useEffect(() => {
    let firstTotal = 0;
    cart.forEach((product) => {
      firstTotal += product.qty * product.price;
    });
    setTotal(firstTotal);
  }, [cart, qty]);
  

  const add1Product = (product) => {
    product.qty = product.qty + 1;
    setQty(qty + 1);
  };

  const sub1Product = (product) => {
    if (product.qty > 1) {
      product.qty = product.qty - 1;
      setQty(qty - 1);
    }
  };

  const isInCart = (id) => {
    return cart.some((product) => product.id === id);
  };

  const addProduct = (product, quantity) => {
    if (isInCart(product.id)) {
      const auxCart = cart.map(auxProduct => {
        if (auxProduct.id === product.id) {
          return { ...auxProduct, qty: auxProduct.qty + quantity };
        }
        return auxProduct;
      });
      setCart(auxCart);
    } else {
      setCart([...cart, { ...product, qty: quantity }]);
    }
  };
  

  const removeProduct = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setQty(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        qty,
        total,
        add1Product,
        sub1Product,
        isInCart,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
        {children}
    </CartContext.Provider>
  );
};
