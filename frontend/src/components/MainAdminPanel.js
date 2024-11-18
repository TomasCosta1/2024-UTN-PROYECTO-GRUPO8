import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import '../styles/AdminPage.css';
<script src="https://kit.fontawesome.com/50303851c6.js" crossorigin="anonymous"></script>

const MainAdminPanel = () => { // Estados para las ordenes, detalles de ordenes, visibilidad de detalles, mesas y mesa en particular
    const [orders, setOrders] = useState([]);
    const [ordersDetail, setOrderDetail] = useState({});
    const [visibleDetails, setVisibleDetails] = useState({});
    const [tables, setTables] = useState([]);
    const [table, setTable] = useState({ id: '', status: '' });

    useEffect(() => {
        fetchOrders();
        fetchTables();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:3000/orders'); // Realiza una solicitud GET para obtener las órdenes
        setOrders(response.data);
    };

    const handleDeleteOrder = async (id) => {
        await axios.delete(`http://localhost:3000/orders/${id}`); // Realiza una solicitud DELETE para eliminar una orden
        fetchOrders();
    };

    const handleMoreClick = async (idOrden) => {
        try {
            setVisibleDetails((prev) => ({
                ...prev,
                [idOrden]: !prev[idOrden], // Alterna la visibilidad de los detalles de la orden
            }));

            if (!ordersDetail[idOrden]) {
                const response = await axios.get(`http://localhost:3000/orderDetails/order/${idOrden}`); // Obtiene los detalles de la orden
                const orderDetails = response.data;

                const detailedOrder = await Promise.all(orderDetails.map(async (detail) => {
                    const productResponse = await axios.get(`http://localhost:3000/products/${detail.id_product}`); // Obtiene los detalles del producto
                    return {
                        ...detail,
                        name: productResponse.data.name, // Añade el nombre del producto a los detalles de la orden
                    };
                }));

                setOrderDetail((prev) => ({
                    ...prev,
                    [idOrden]: detailedOrder, // Actualiza el estado con los detalles de la orden
                }));
            }
        } catch (error) {
            console.error("Error al obtener los detalles de la orden:", error);
        }
    };

    const fetchTables = async () => {
        const response = await axios.get('http://localhost:3000/tables'); // Realiza una solicitud GET para obtener todas las mesas
        setTables(response.data);
    };

    const handleDeleteTable = async (id) => {
        try{
            await axios.delete(`http://localhost:3000/tables/${id}`); // Realiza una solicitud DELETE para eliminar una mesa
        }catch{
            toast.error("Esta mesa tiene ordenes asociadas", {theme: "colored"});
        }
        fetchTables();
    };

    const handleAddTable= async () => {
        await axios.post('http://localhost:3000/tables', table); // Realiza una solicitud POST para agregar una nueva mesa
        fetchTables();
        setTable({ id: '', status: '' });
    };

    const getStatusClass = (status) => { // Función para asignar una clase CSS según el estado de la mesa
        switch (status) {
            case 'Libre':
                return 'status-available';
            case 'Ocupada':
                return 'status-occupied';
            case 'Reservada':
                return 'status-reserved';
            default:
                return '';
        }
    };

    const changeTableStatus = async (id) => { // Función para cambiar el estado de una mesa
        const table = tables.find((table) => table.id === id);
        const newStatus = table.status === 'Libre' ? 'Ocupada' : table.status === 'Ocupada' ? 'Reservada' : 'Libre';
        await axios.patch(`http://localhost:3000/tables/${id}`, { status: newStatus }); // Realiza una solicitud PATCH para actualizar el estado de la mesa
        fetchTables();
    }


    const changeOrderStatus = async (id) => { // Función para cambiar el estado de una orden y permitir sumar puntos al cliente
        if (!window.confirm("¿Estás seguro de que deseas cambiar el estado de esta orden a 'Pagada'?")) {
            return;
        }

        const order = orders.find((order) => order.id === id); // Encuentra la orden por su ID
        await axios.patch(`http://localhost:3000/orders/${id}`, { status: 'Pagada' });

        const clientId = order.id_client;
        const pointsToAdd = order.totalPrice * 0.01; // Calcula los puntos a añadir (1% del precio total de la orden)

        try {
            const response = await axios.get(`http://localhost:3000/clients/${clientId}`); // Realiza una solicitud GET para obtener los datos del cliente
            const client = response.data;
            const currentPoints = client.points || 0; // Obtiene los puntos actuales del cliente, o 0 si no tiene puntos
            const newPoints = currentPoints + pointsToAdd;

            await axios.patch(`http://localhost:3000/clients/${clientId}`, { points: newPoints }); // Realiza una solicitud PATCH para actualizar los puntos del cliente
        } catch (error) {
            console.error('Error al actualizar los puntos del cliente:', error);
        }

        fetchOrders();
    }
    
    return (
        <div className='adminPage'>
            <div className='panelContainer'>
                <section className='ordersPanel'>
                <h2 className='title'>Ordenes</h2>
                    <ul>
                        {orders.filter(order => order.status === 'Pendiente').map((order) => (
                            <li key={order.id} className='product'>
                                <div className='mainInfo'>
                                    Orden {order.id} - Mesa {order.status} - ${order.totalPrice}
                                    <div>
                                        {order.status !== 'Pagada' && (
                                            <button onClick={() => changeOrderStatus(order.id)} className='btnAdd'><i className="fa-solid fa-check"></i></button>
                                        )}
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
                </section>
                <section className='tablesPanel'>
                    <h2 className='title'>Mesas</h2>
                    <ul>
                        <li>
                            <a href="#" className='product btnAdd' id='btnAddTable' onClick={handleAddTable}><i className="fa-solid fa-plus"></i></a>
                        </li>
                        {tables.map((table) => (
                            <li key={table.id} className='product'>
                                <div className='mainInfo'>
                                    Mesa {table.id} <span className={getStatusClass(table.status)}>{table.status}</span> 
                                    <div>
                                        <button onClick={() => changeTableStatus(table.id)} className='btnDefault'><i className="fa-solid fa-rotate"></i></button>
                                        <button onClick={() => handleDeleteTable(table.id)} className='btnRemove'>Eliminar</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MainAdminPanel;
