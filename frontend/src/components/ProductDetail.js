import React, { useEffect, useState } from "react";

 
// Declarar componentes
const ProductDetail = () => {
// declarar variables, funciones y return
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Simulando una llamada a una API
        const obtenerProductos = async () => {
          const response = await fetch(`http://localhost:3000/products/`);
          const data = await response.json();
          setProductos(data);
        };

        obtenerProductos();
    }, []);

    return (
        <div>
          <h1>Lista de Productos</h1>
          <ul>
            {productos.map(producto => (
              <li key={producto.id}>
                <h2>{producto.name}</h2>
                <p>Precio: ${producto.price}</p>
                <p>{producto.desc}</p>
              </li>
            ))}
          </ul>
        </div>
    );


}

export default ProductDetail