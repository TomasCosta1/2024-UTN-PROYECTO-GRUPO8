import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Cart.css";

const Cart = () => {
  const navigate = useNavigate()
  const { cart, removeProduct, add1Product, sub1Product, total, clearCart } =
    useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    id_client: "",
    id_table: "",
    total: "",
  });

  const createOrder = async () => {
    const order = {
      id_client: 1,
      id_table: 1,
      totalPrice: total,
    };
    setOrder(order);
    const response = await axios.post("http://localhost:3000/orders", order);
    const createdOrder = response.data;
    console.log(createdOrder);
    sendInfo(Number(createdOrder.id));
    alert("Pedido realizado con éxito");
    clearCart();
    navigate("/")
  };

  const sendInfo = async (orderId) => {
    const newProducts = cart.map((product) => ({
      id_product: product.id,
      quantity: product.qty,
      totalPrice: product.price * product.qty,
    }));
  
    for (const product of newProducts) {
      const orderDetail = {
        id_order: orderId,
        id_product: product.id_product,
        quantity: product.quantity,
        totalPrice: product.totalPrice,
      };
      await axios.post("http://localhost:3000/orderDetails", orderDetail);
    }
  };
  

  return (
    <>
      <section className="volver">
        <Link to="/" className="link">
          Volver al menú
        </Link>
      </section>
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
        <button className="checkoutButton" onClick={createOrder}>Realizar Pedido</button>
        <button onClick={clearCart} className="vaciarCarrito">
          Vaciar Carrito
        </button>
      </div>
    </>
  );
};

export default Cart;
