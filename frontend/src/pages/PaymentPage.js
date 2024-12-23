import React, { useState, useEffect, useContext } from "react";
import Payment from "../components/Payment";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";

const PaymentPage = () => {

  const { verify, email } = useContext(UserContext);
  verify();

  const { // Obtiene los datos del contexto del carrito
    total,
    cart,
    clearCart,
    tableNumber,
    handlePaymentState,
    handleOrderNumber,
    handleOrderState,
  } = useContext(CartContext);
  
  return (
    <>
      <Header />
      <div>
        <Payment
          total={total}
          cart={cart}
          tableNumber={tableNumber}
          clearCart={clearCart}
          handlePaymentState={handlePaymentState}
          handleOrderNumber={handleOrderNumber}
          handleOrderState={handleOrderState}
          email={email}
        />
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
