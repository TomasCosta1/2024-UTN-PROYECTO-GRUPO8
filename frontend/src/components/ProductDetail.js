import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductDetail.css';

const ProductDetail = ({ productId }) => {
    const [producto, setProducto] = useState(null);

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
                <section className="btns">
                    <select className="select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <button className="btnAdd" onClick={() => console.log('Producto agregado al carrito')}>Agregar al carrito</button>
                </section>
            </div>
        </>
    );
};

export default ProductDetail;
