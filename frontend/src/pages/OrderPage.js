import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";
import "../styles/Success.css";
import { UserContext } from "../context/UserContext";

const ClientOrderPage = () => {
  
  const { verify } = useContext(UserContext);
  verify();

  const { orderNumber, orderState } = useContext(CartContext);
  if (orderState === "approved") {
    return (
      <>
        <Header />
        <div className="bodySuccess">
          <h1>Gracias por tu compra, tu pedido está en proceso</h1>
          <h2>Número de pedido: {orderNumber}</h2>
        </div>
        <Footer />
      </>
    );
  } else if (orderState === "failed") {
    return (
      <>
        <Header />
        <div className="bodySuccess">
          <h1>Parece que hubo un error en el pago.</h1>
          <h2>
            Inténtelo de nuevo o acérquese a la caja para poder brindarle
            asistencia.
          </h2>
        </div>
        <Footer />
      </>
    );
  } else if (orderState === "pending") {
    return (
      <>
        <Header />
        <div className="bodySuccess">
          <h1>
            Gracias por tu compra, llame a un mozo o acérquese a la caja para
            realizar el pago.
          </h1>
          <h2>Número de pedido: {orderNumber}</h2>
        </div>
        <Footer />
      </>
    );
  }
};

export default ClientOrderPage;