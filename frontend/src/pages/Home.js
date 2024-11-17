import React, { useContext } from 'react';
import ProductList from '../components/ProductList';
import "../styles/ProductCard.css";
import '../styles/ProductList.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext, UserProvider } from '../context/UserContext';

const Home = () => {
    const { verify } = useContext(UserContext);
    verify();
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