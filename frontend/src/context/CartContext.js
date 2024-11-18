import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [orderState, setOrderState] = useState('');
  const [tableNumber, setTableNumber] = useState(0);

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

  const handlePaymentState = () => {
    setPago(true);
  }

  const handleOrderNumber = (id) => {
    setOrderNumber(id);
  }

  const handleOrderState = (state) => {
    setOrderState(state);
  }
  const handleTableNumber = (table) => {
    setTableNumber(table);
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        qty,
        total,
        pago,
        orderNumber,
        orderState,
        tableNumber,
        add1Product,
        sub1Product,
        isInCart,
        addProduct,
        removeProduct,
        clearCart,
        handlePaymentState,
        handleOrderNumber,
        handleOrderState,
        handleTableNumber,
      }}
    >
        {children}
    </CartContext.Provider>
  );
};
