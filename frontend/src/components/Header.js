import React, { useState, useEffect, useContext } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from "../context/UserContext";


const Header = () => {
    const { admin, clearUser, user } = useContext(UserContext);
    return (
        <header>
            <h1>Gestor de Restaurant</h1>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/aboutUs">Sobre Nosotros</Link></li>
                    <li><Link to="/contact">Contacto</Link></li>
                    {admin && <li><Link to="/admin">Admin Panel</Link></li>}
                    {user && <button onClick={clearUser}><i class="fa-solid fa-right-from-bracket"></i></button>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;