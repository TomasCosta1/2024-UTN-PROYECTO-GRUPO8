import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from 'axios';
import { Link } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, removeProduct, add1Product, sub1Product, total, clearCart } =
    useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({id_client:'', id_table:'', total:''})

  const createOrder = async () => {
    const order = {
      id_client: 1,
      id_table: 1,
      total: total
    };
    setOrder(order);
    const response = await axios.post('http://localhost:3000/orders', order);
    const createdOrder = response.data;
    console.log(createdOrder);
    sendInfo(createdOrder.id)
  }

  const sendInfo = async (orderId) => {
    cart.forEach((product) => {
      setProducts([
        ...products,
        {
          product_id: product.id,
          quantity: product.qty,
          totalPrice: product.price * product.qty,
        },
      ]);
    });
    products.forEach(async (product) => {
      const orderDetail = {
        order_id: orderId,
        product_id: product.product_id,
        quantity: product.quantity,
        totalPrice: product.totalPrice,
      };
      await axios.post('http://localhost:3000/orderDetails', orderDetail);
    });
  };

  return (
    <>
      <div className="cartContainer">
        <div className="titlesContainer">
          <p>Producto</p>
          <p>Cantidad</p>
          <p>Precio</p>
          <p>Subtotal</p>
          <p>Eliminar</p>
        </div>
        {cart.map((product) => (
          <div key={product.id} className="productContainer">
            <p>{product.name}</p>
            <div className="qtyContainer">
              <button
                onClick={() => sub1Product(product)}
                className="qtyButton"
              >
                -
              </button>
              <p className="qty">{product.qty}</p>
              <button
                onClick={() => add1Product(product)}
                className="qtyButton"
              >
                +
              </button>
            </div>
            <p className="cartPrice">${product.price}</p>
            <p className="cartPrice">
              ${(product.price * product.qty).toFixed(2)}
            </p>
            <button
              className="cartDelete"
              onClick={() => removeProduct(product.id)}
            >
              <i className="fa-solid fa-trash-can trashCan"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="totalContainer">
        <p className="totalCart">Total: ${total.toFixed(2)}</p>
        <button className="checkoutButton">Realizar Pedido</button>
        <button onClick={clearCart} className="vaciarCarrito">
          Vaciar Carrito
        </button>
      </div>
    </>
  );
};

export default Cart;
