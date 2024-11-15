import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css';
<script src="https://kit.fontawesome.com/50303851c6.js" crossorigin="anonymous"></script>

const MainAdminPanel = () => {
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

    const fetchTables = async () => {
        const response = await axios.get('http://localhost:3000/tables');
        setTables(response.data);
    };

    const handleDeleteTable = async (id) => {
        await axios.delete(`http://localhost:3000/tables/${id}`);
        fetchTables();
    };

    const handleAddTable= async () => {
        await axios.post('http://localhost:3000/tables', table);
        fetchTables();
        setTable({ id: '', status: '' });
    };

    const getStatusClass = (status) => {
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

    const changeTableStatus = async (id) => {
        const table = tables.find((table) => table.id === id);
        const newStatus = table.status === 'Libre' ? 'Ocupada' : table.status === 'Ocupada' ? 'Reservada' : 'Libre';
        await axios.patch(`http://localhost:3000/tables/${id}`, { status: newStatus });
        fetchTables();
    }

    return (
        <div className='adminPage'>
            <div className='panelContainer'>
                <section className='ordersPanel'>
                <h2 className='title'>Ordenes</h2>
                    <ul>
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
                </section>
                <section className='tablesPanel'>
                    <h2 className='title'>Mesas</h2>
                    <ul>
                        <li>
                            <a href="#" className='product btnAdd' id='btnAddTable' onClick={handleAddTable}><i class="fa-solid fa-plus"></i></a>
                        </li>
                        {tables.map((table) => (
                            <li key={table.id} className='product'>
                                <div className='mainInfo'>
                                    Mesa {table.id} <span className={getStatusClass(table.status)}>{table.status}</span> 
                                    <div>
                                        <button onClick={() => changeTableStatus(table.id)} className='btnDefault'><i class="fa-solid fa-rotate"></i></button>
                                        <button onClick={() => handleDeleteTable(table.id)} className='btnRemove'>Eliminar</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default MainAdminPanel;
