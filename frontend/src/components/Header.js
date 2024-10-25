import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>Gestor de Restaurant</h1>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/admin">Sobre Nosotros</Link></li>
                    <li><Link href="/contact">Contacto</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;