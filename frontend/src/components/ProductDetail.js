import React, { useEffect, useState } from "react";


const ProductDetail = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
          const response = await fetch(`http://localhost:3000/products/2`);
          const data = await response.json();
          setProductos(data);
        };

        obtenerProductos();
    }, []);

    return (
        <div>
          <img src={productos.image}/>
          <h2>{productos.name}</h2> 
          <p>{productos.desc}</p>
          <h3>${productos.price}</h3>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <button>Agregar{productos.price}</button>
        </div>
    );


}

export default ProductDetail