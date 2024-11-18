import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ total, tableNumber, cart, clearCart, handlePaymentState, handleOrderNumber, handleOrderState }) => {
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
    const order = {
      id_client: 1,
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

  const handlePaymentSuccess = (result) => {
    console.log('Payment approved:', result);
    handleOrderState('approved');
    createOrder();
  };

  const handlePaymentFailure = (error) => {
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