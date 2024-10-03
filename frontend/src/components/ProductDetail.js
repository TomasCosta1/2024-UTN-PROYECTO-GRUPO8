import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProductDetail.styles";


const ProductDetail = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
          const response = await fetch(`http://localhost:3000/products/4`);
          const data = await response.json();
          setProductos(data);
        };

        obtenerProductos();
    }, []);

    return (
      <>
        <Link to="/products" style={styles.link}>Volver al menú</Link>
        <div style={styles.div}>
          <img src={productos.img} style={styles.img} />
          <h2 style={styles.h2}>{productos.name}</h2> 
          <span>{productos.desc}</span>
          <h3>${productos.price}</h3>
          <section style={styles.section}>
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
              <button>Agregar ${productos.price}</button>
            </section>
        </div>
      </>
    );


}

export default ProductDetail