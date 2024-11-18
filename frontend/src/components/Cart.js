import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeProduct,
    add1Product,
    sub1Product,
    total,
    clearCart,
    handleOrderNumber,
    handleOrderState,
    tableNumber,
    handleTableNumber,
  } = useContext(CartContext);

  const [paymentOption, setPaymentOption] = useState("");

  const createOrder = async () => {
    const order = {
      id_client: 1,
      id_table: tableNumber,
      totalPrice: total,
    };
    const response = await axios.post("http://localhost:3000/orders", order);
    const createdOrder = response.data;
    sendInfo(Number(createdOrder.id));
    handleOrderNumber(Number(createdOrder.id));
    clearCart();
    navigate("/clientOrder");
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

  const redirectPayment = () => {
    if (paymentOption === "efectivo") {
      handleOrderState("pending");
      createOrder();
    }
    if (paymentOption === "tarjeta") {
      navigate("/payment");
    }
    if (paymentOption === "") {
      document.querySelector("#alert").classList.remove("alertDisabled");
      document.querySelector("#alert").classList.add("alertEnabled");
    }
  };

  const handlePaymentTarjeta = () => {
    setPaymentOption("tarjeta");
  };

  const handlePaymentEfectivo = () => {
    setPaymentOption("efectivo");
  };

  const handleChangeTableNumber  = (e) => {
    const tableNumber = e.target.value;
    handleTableNumber(tableNumber);
  }

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
        <p>Seleccioná un método de pago:</p>
        <section>
          <input
            type="radio"
            id="tarjeta"
            name="payment"
            value="tarjeta"
            onClick={handlePaymentTarjeta}
          />
          <label for="tarjeta">Crédito/Débito</label>
        </section>
        <section>
          <input
            type="radio"
            id="efectivo"
            name="payment"
            value="efectivo"
            onClick={handlePaymentEfectivo}
          />
          <label for="efectivo">Efectivo</label>
        </section>
        <section className="tableNumber">
          <label for="tableNumber">Número de mesa</label>
          <input type="number" id="tableNumber" name="tableNumber" onChange={handleChangeTableNumber}></input>
        </section>
      </div>
      <div className="totalContainer">
        <p className="alertDisabled" id="alert">
          Debes seleccionar un método de pago para continuar
        </p>
        <p className="totalCart">Total: ${total.toFixed(2)}</p>
        <button className="checkoutButton" onClick={redirectPayment}>
          Pagar Pedido
        </button>
        <button onClick={clearCart} className="vaciarCarrito">
          Vaciar Carrito
        </button>
      </div>
    </>
  );
};

export default Cart;
