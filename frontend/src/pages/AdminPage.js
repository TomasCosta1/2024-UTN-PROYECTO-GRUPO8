import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ id: '', name: '', desc: '', img: '', price: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
    };

    const fetchProductById = async (id) => {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleAddProduct = async () => {
        await axios.post('http://localhost:3000/products', product);
        fetchProducts();
        setProduct({ id: '', name: '', desc: '', img: '', price: '' });
    };

    const handleEditProduct = async () => {
        await axios.patch(`http://localhost:3000/products/${product.id}`, product);
        fetchProducts();
        setProduct({ id: '', name: '', desc: '', img: '', price: '' });
        setIsEditing(false);
    };

    const handleDeleteProduct = async (id) => {
        await axios.delete(`http://localhost:3000/products/${id}`);
        fetchProducts();
    };

    const handleEditClick = (product) => {
        setProduct(product);
        setIsEditing(true);
    };

    return (
        <>
        <Header/>
        <div>
            <h1>Seccion de Administracion</h1>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del Producto"
                    value={product.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="desc"
                    placeholder="Descripcion del Producto"
                    value={product.desc}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="img"
                    placeholder="URL imagen del Producto"
                    value={product.img}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Precio del Producto"
                    value={product.price}
                    onChange={handleInputChange}
                />
                {isEditing ? (
                    <button onClick={handleEditProduct}>Actualizar Producto</button>
                ) : (
                    <button onClick={handleAddProduct}>Agregar Producto</button>
                )}
            </div>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => handleEditClick(product)}>Editar</button>
                        <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
        <Footer/>
        </>
    );
};

export default AdminPage;