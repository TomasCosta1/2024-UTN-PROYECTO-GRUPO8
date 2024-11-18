import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css';

const ProductsAdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({ id: '', name: '', description: '', img: '', price: '', category: '' });
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
        setProduct({ id: '', name: '', description: '', img: '', price: '', category: '' });
    };

    const handleEditProduct = async () => {
        await axios.patch(`http://localhost:3000/products/${product.id}`, product);
        fetchProducts();
        setProduct({ id: '', name: '', description: '', img: '', price: '' , category: ''});
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

    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    const filteredProducts = products.filter((product) => {
        return (
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
            (product.category === searchCategory || searchCategory === '')
        );
    });

    return (
        <div className='adminPage'>
            <h1 className='title'>Administracion de Productos</h1>
            <div className='productsPanel'>
                <section>
                    <form className='filter' onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Buscar producto"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <select value={searchCategory} onChange={handleCategoryChange}>
                            <option value="" disabled selected>Categoría</option>
                            <option value="Entrada">Entrada</option>
                            <option value="PlatoPrincipal">Plato Principal</option>
                            <option value="Postre">Postre</option>
                            <option value="Bebida">Bebida</option>
                        </select>
                        <button className='btnDefault' type="button" onClick={() => { setSearchTerm(''); setSearchCategory(''); }}>Limpiar filtros</button>
                    </form>
                    <ul className='listResult'>
                        {filteredProducts.map((product) => (
                            <li key={product.id} className='product'>
                                <div className='mainInfo'>
                                    {product.name} - ${product.price}
                                    <div>
                                        <button onClick={() => handleEditClick(product)} className='btnEdit'>Editar</button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className='btnRemove'>Eliminar</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className='search'>
                    <img src={product.img} alt={product.name} />
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del Producto"
                        value={product.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripcion del Producto"
                        value={product.description}
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
                    <select name="category" value={product.category} onChange={handleInputChange}>
                        <option value="" disabled>Selecciona una categoría</option>
                        <option value="Entrada">Entrada</option>
                        <option value="PlatoPrincipal">Plato Principal</option>
                        <option value="Postre">Postre</option>
                        <option value="Bebida">Bebida</option>
                    </select>
                    {isEditing ? (
                        <button onClick={handleEditProduct} className='btnAdd'>Actualizar Producto</button>
                    ) : (
                        <button onClick={handleAddProduct} className='btnAdd'>Agregar Producto</button>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProductsAdminPanel;