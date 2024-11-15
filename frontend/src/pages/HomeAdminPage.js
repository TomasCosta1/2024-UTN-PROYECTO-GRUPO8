import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';  

const HomeAdminPage = () => {
    const [orders, setOrders] = useState([]);
    const [ordersDetail, setOrderDetail] = useState({});
    const [visibleDetails, setVisibleDetails] = useState({});

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:3000/orders');
        setOrders(response.data);
    };

    const handleDeleteOrder = async (id) => {
        await axios.delete(`http://localhost:3000/orders/${id}`);
        fetchOrders();
    };

    const handleMoreClick = async (idOrden) => {
        try {
            setVisibleDetails((prev) => ({
                ...prev,
                [idOrden]: !prev[idOrden], 
            }));

            if (!ordersDetail[idOrden]) {
                const response = await axios.get(`http://localhost:3000/orderDetails/order/${idOrden}`);
                const orderDetails = response.data;

                const detailedOrder = await Promise.all(orderDetails.map(async (detail) => {
                    const productResponse = await axios.get(`http://localhost:3000/products/${detail.id_product}`);
                    return {
                        ...detail,
                        name: productResponse.data.name,
                    };
                }));

                setOrderDetail((prev) => ({
                    ...prev,
                    [idOrden]: detailedOrder,
                }));
            }
        } catch (error) {
            console.error("Error al obtener los detalles de la orden:", error);
        }
    };

    return (
        <div className='adminPage'>
        <Header />
        <h2 className='title'>Home Admin</h2>
        <section>
            <ul className='listResult'>
                {orders.map((order) => (
                    <li key={order.id} className='product'>
                        <div className='mainInfo'>
                            Orden {order.id} - {order.status} - ${order.totalPrice}
                            <div>
                                <button onClick={() => handleMoreClick(order.id)} className='btnEdit'>
                                    {visibleDetails[order.id] ? 'Ver menos' : 'Ver más'}
                                </button>
                                <button onClick={() => handleDeleteOrder(order.id)} className='btnRemove'>Eliminar</button>
                            </div>
                        </div>
                        {visibleDetails[order.id] && (
                            <div className='orderDetail'>
                                <div className="gridContainer">
                                    <div className="gridHeader">Nombre</div>
                                    <div className="gridHeader">Precio Total</div>
                                    <div className="gridHeader">Cantidad</div>
                                </div>
                                {ordersDetail[order.id]?.map((orderDetail) => (
                                    <div key={orderDetail.id} className="gridRow">
                                        <div>{orderDetail.name}</div>
                                        <div>${orderDetail.totalPrice}</div>
                                        <div>{orderDetail.quantity}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <a href="/admin/products" className='btnDefault'>Administrar Productos</a>
        </section>
        <section>
            <h2 className='title'>Administrar Mesas</h2>
            <p>En construcción...</p>
        </section>
        <Footer />
    </div>
    );
};

export default HomeAdminPage;
