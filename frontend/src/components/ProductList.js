import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  console.log(products);
  const starters = products.filter((product) => product.category === "Entrada");
  const mainCourses = products.filter(
    (product) => product.category === "Plato Principal"
  );
  const desserts = products.filter((product) => product.category === "Postre");
  const drinks = products.filter((product) => product.category === "Bebida");

  return (
    <div>
      <section>
        <p>Entrada</p>
        <ul>
          {starters.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>Precio: ${product.price}</p>
              <p>{product.desc}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p>Plato Principal</p>
        <ul>
          {mainCourses.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>Precio: ${product.price}</p>
              <p>{product.desc}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p>Postre</p>
        <ul>
          {desserts.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>Precio: ${product.price}</p>
              <p>{product.desc}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p>Bebida</p>
        <ul>
          {drinks.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>Precio: ${product.price}</p>
              <p>{product.desc}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProductList;
