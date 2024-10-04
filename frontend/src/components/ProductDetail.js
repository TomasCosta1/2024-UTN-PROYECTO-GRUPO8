import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  "../styles/ProductDetail.styles.css";


const ProductDetail = (producto) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
          const response = await fetch(`http://localhost:3000/products/${producto.id}`); 
          const data = await response.json();
          setProductos(data);
        };

        obtenerProductos();
    }, []);

    return (
      <>
        <div className="div">
          <section className="volver">
            <Link to="/products" className="link">Volver al menú</Link>
          </section>
          <img src={productos.img} className="img" />
          <h2 className="h2">{productos.name}</h2> 
          <p className="p">{productos.description}</p>
          <h3 className="h3"> ${productos.price} </h3>
          <section className="section">
              <select className="select">
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
              <article className="button">
                <span>Agregar</span>
                <span>${productos.price}</span>
              </article>
            </section>
        </div>
      </>
    );


}

export default ProductDetail