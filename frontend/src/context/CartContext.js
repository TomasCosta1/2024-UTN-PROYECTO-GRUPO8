import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => { // Define el proveedor del contexto del carrito de compras
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [orderState, setOrderState] = useState('');
  const [tableNumber, setTableNumber] = useState(0);

  useEffect(() => { // Efecto para actualizar la cantidad de productos en el carrito
    let firstQty = 0;
    cart.forEach((product) => {
      firstQty += product.qty;
    });
    setQty(firstQty);
  }, [cart]);

  useEffect(() => { // Efecto para actualizar el total de la compra
    let firstTotal = 0;
    cart.forEach((product) => {
      firstTotal += product.qty * product.price;
    });
    setTotal(firstTotal);
  }, [cart, qty]);
  

  const add1Product = (product) => { // Función para agregar un producto al carrito
    product.qty = product.qty + 1;
    setQty(qty + 1);
  };

  const sub1Product = (product) => { // Función para disminuir un producto del carrito
    if (product.qty > 1) {
      product.qty = product.qty - 1;
      setQty(qty - 1);
    }
  };

  const isInCart = (id) => { // Función para verificar si un producto ya está en el carrito
    return cart.some((product) => product.id === id);
  };

  const addProduct = (product, quantity) => { // Función para agregar un producto al carrito con una cantidad específica
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
  

  const removeProduct = (id) => { // Función para eliminar un producto del carrito
    setCart(cart.filter((product) => product.id !== id));
  };

  const clearCart = () => { // Función para vaciar el carrito
    setCart([]);
    setQty(0);
  };

  // Funciones para manejar el estado de pago, número de orden y número de mesa
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

  return ( // Retorna el proveedor del contexto del carrito de compras con sus valores y funciones muy importantes
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
