import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainAdminPanel from './MainAdminPanel';
import ProductAdminPanel from './ProductsAdminPanel';
import '../styles/AdminPage.css';
import { UserContext } from "../context/UserContext";

const HomeAdminPage = () => {
    const { verify } = useContext(UserContext);
    verify();
    const [selected, setSelected] = useState('Principal');
    const handleSelection = (item) => {
        setSelected(item);
    };

    const renderContent = () => {
        switch (selected) {
            case 'Principal':
                return <MainAdminPanel />;
            case 'Administrar Productos':
                return <ProductAdminPanel />;
            case 'Perfil':
                return;
            case 'Salir':
                // Puedes manejar la lógica de salir aquí
                return null;
            default:
                return <MainAdminPanel />;
        }
    };

    return(
        <div className='adminPage'>
            <Header/>
            <div className='adminPanel'>
                <section className='sidebar'>
                <ul>
                <li className={selected === 'Principal' ? 'selected' : ''} onClick={() => handleSelection('Principal')}>Principal</li>
                        <hr />
                        <li className={selected === 'Administrar Productos' ? 'selected' : ''} onClick={() => handleSelection('Administrar Productos')}>Administrar Productos</li>
                        <hr />
                        <li className={selected === 'Perfil' ? 'selected' : ''} onClick={() => handleSelection('Perfil')}>Perfil</li>
                        <hr />
                        <li className={selected === 'Salir' ? 'selected' : ''} onClick={() => handleSelection('Salir')}>Salir</li>
                </ul>
                </section>
                <section className='content'>
                {renderContent()}
                </section>
            </div>
            <Footer/>
        </div>
    );
};

export default HomeAdminPage;