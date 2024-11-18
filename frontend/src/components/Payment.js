import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ total, tableNumber, cart, clearCart, handlePaymentState, handleOrderNumber, handleOrderState, email }) => {
  useEffect(() => {
    initMercadoPago('TEST-c4281a92-a00c-4b5d-ba67-f3057580a28a', {
      locale: 'es-AR',
    }); // Inicializa MercadoPago con la clave de prueba y nuestra configuración regional
  }, []);
  const [order, setOrder] = useState({
    id_client: "",
    id_table: "",
    total: "",
  }); // Estado para manejar la orden
  const navigate = useNavigate();

  const initialization = {
    amount: total,
  };

  const createOrder = async () => { // Función para crear una orden
    const responseEmail = await fetch (`http://localhost:3000/clients/client-id/${encodeURIComponent(email)}`); // Solicitud para obtener el clientId a partir del email
    const data = await responseEmail.json();
    const clientId = data.id;
    const order = {
      id_client: clientId,
      id_table: tableNumber,
      totalPrice: total,
    };
    setOrder(order);
    const response = await axios.post("http://localhost:3000/orders", order); // Solicitud para crear la orden
    const createdOrder = response.data;
    sendInfo(Number(createdOrder.id));
    handleOrderNumber(Number(createdOrder.id));
    clearCart();
    handlePaymentState();
    navigate("/clientOrder");
  };

  const sendInfo = async (orderId) => { // Función para enviar la información de la orden
    const newProducts = cart.map((product) => ({
      id_product: product.id,
      quantity: product.qty,
      totalPrice: product.price * product.qty,
    }));
  
    for (const product of newProducts) { // Itera sobre los productos del carrito
      const orderDetail = {
        id_order: orderId,
        id_product: product.id_product,
        quantity: product.quantity,
        totalPrice: product.totalPrice,
      };
      await axios.post("http://localhost:3000/orderDetails", orderDetail); // Envía los detalles de la orden al servidor
    }
  };

  const onSubmit = async (formData) => { // Función para manejar el envío del formulario de pago

    try {
      const response = await axios.post('http://localhost:3000/payment', formData); // Realiza una solicitud POST al servidor con los datos del formulario de pago

      const result = response.data;
      

      if (result.status === 'approved') {
        handlePaymentSuccess(result);
      } else {
        handlePaymentFailure(result);
      }
    } catch (error) {
      console.error('Error:', error);
      handlePaymentFailure(error);
    }
  };

  const handlePaymentSuccess = (result) => { // Función para manejar el éxito del pago
    console.log('Payment approved:', result);
    handleOrderState('approved');
    createOrder();
  };

  const handlePaymentFailure = (error) => { // Función para manejar el fallo del pago
    console.error('Payment failed:', error);
    clearCart();
    handleOrderState('failed');
    navigate("/clientOrder");
  };


  return (
    <CardPayment
      initialization={initialization}
      onSubmit={onSubmit}
    />
  );
};

export default PaymentForm;