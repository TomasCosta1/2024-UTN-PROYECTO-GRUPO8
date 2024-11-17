import React, { useState, useEffect, useContext } from "react";
import Payment from "../components/Payment";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UserContext } from "../context/UserContext";

const PaymentPage = () => {

  const { verify } = useContext(UserContext);
  verify();


  const {
    total,
    cart,
    clearCart,
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
          clearCart={clearCart}
          handlePaymentState={handlePaymentState}
          handleOrderNumber={handleOrderNumber}
          handleOrderState={handleOrderState}
        />
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
