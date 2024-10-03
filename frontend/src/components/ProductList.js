import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  //Traigo los productos de la DB
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
  // Filtro los productos por las categorias principales para poder mostrarlos en la lista de manera ordenada
  const starters = products.filter((product) => product.category === "Entrada");
  const mainCourses = products.filter(
    (product) => product.category === "PlatoPrincipal"
  );
  const desserts = products.filter((product) => product.category === "Postre");
  const drinks = products.filter((product) => product.category === "Bebida");

  return (
    <div>
      <section>
        <p>Entrada</p>
        <ul>
          {starters.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
      <section>
        <p>Plato Principal</p>
        <ul>
          {mainCourses.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
      <section>
        <p>Postre</p>
        <ul>
          {desserts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
      <section>
        <p>Bebida</p>
        <ul>
          {drinks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProductList;
