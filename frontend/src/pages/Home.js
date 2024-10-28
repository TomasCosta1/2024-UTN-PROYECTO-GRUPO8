import React from 'react';
import ProductList from '../components/ProductList';
import "../styles/ProductCard.css";
import '../styles/ProductList.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
        <Header/>
        <div>
            <ProductList />
        </div>
       <Footer/> 
        </>
    );
};

export default Home;