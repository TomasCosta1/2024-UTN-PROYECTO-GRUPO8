import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductDetail.css';
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = ({ productId }) => {
    const [producto, setProducto] = useState(null);

    const {addProduct} = useContext(CartContext);

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${productId}`);
                const data = await response.json();
                setProducto(data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        obtenerProducto();
    }, [productId]);

    if (!producto) {
        return <div>Cargando producto...</div>;
    }

    const onAdd = (quantity) => {
        const notify = () => toast.success(`Agregaste ${quantity} ${producto.name} al carrito`, {theme  : "colored"});
        addProduct(producto, quantity);
        notify();
    }

    return (
        <>
            <div className="productDetail">
                <section className="volver">
                    <Link to="/" className="link">Volver al menú</Link>
                </section>
                {producto.img && <img src={producto.img} alt={producto.name} className="img" />}
                <h2 className="h2">{producto.name}</h2>
                <p>{producto.description}</p>
                <p className='price'> ${producto.price} </p>
                <ItemCount onAdd={onAdd}/>
                <ToastContainer />
            </div>
        </>
    );
};

export default ProductDetail;
