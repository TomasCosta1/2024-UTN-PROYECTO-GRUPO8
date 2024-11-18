import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ total, tableNumber, cart, clearCart, handlePaymentState, handleOrderNumber, handleOrderState, email }) => {
  useEffect(() => {
    initMercadoPago('TEST-c4281a92-a00c-4b5d-ba67-f3057580a28a', {
      locale: 'es-AR',
    });
  }, []);
  const [order, setOrder] = useState({
    id_client: "",
    id_table: "",
    total: "",
  });
  const navigate = useNavigate();

  const initialization = {
    amount: total,
  };

  const createOrder = async () => {
    const responseEmail = await fetch (`http://localhost:3000/clients/client-id/${encodeURIComponent(email)}`);
    const data = await responseEmail.json();
    const clientId = data.id;
    const order = {
      id_client: clientId,
      id_table: tableNumber,
      totalPrice: total,
    };
    setOrder(order);
    const response = await axios.post("http://localhost:3000/orders", order);
    const createdOrder = response.data;
    sendInfo(Number(createdOrder.id));
    handleOrderNumber(Number(createdOrder.id));
    clearCart();
    handlePaymentState();
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

  const onSubmit = async (formData) => { 

    try {
      const response = await axios.post('http://localhost:3000/payment', formData);

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

  const handlePaymentSuccess = async (result) => {
    console.log('Payment approved:', result);
    handleOrderState('approved');
    await createOrder();
    await updateClientPoints(); // Actualiza los puntos del cliente
  };

  const handlePaymentFailure = (error) => {
    console.error('Payment failed:', error);
    clearCart();
    handleOrderState('failed');
    navigate("/clientOrder");
  };

  const updateClientPoints = async () => {
    try {

      const responseEmail = await fetch(`http://localhost:3000/clients/client-id/${encodeURIComponent(email)}`);
      const data = await responseEmail.json();
      const clientId = data.id;

      // Obtinee los puntos actuales del cliente y suma los nuevos puntos
      const userResponse = await axios.get(`http://localhost:3000/clients/${clientId}`);
      const currentPoints = userResponse.data.points;
      
      const user = {
        points: currentPoints + total * 0.01,
      };
      await axios.patch(`http://localhost:3000/clients/${clientId}`, user);
      console.log('Puntos actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar los puntos:', error);
    }
  };

  return (
    <CardPayment
      initialization={initialization}
      onSubmit={onSubmit}
    />
  );
};

export default PaymentForm;