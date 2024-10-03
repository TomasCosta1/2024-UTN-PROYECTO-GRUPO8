import React from 'react';
import '../styles/Header.css';

const Header = () => {
    return (
        <header>
            <h1>Gestor de Restaurant</h1>
            <nav>
                <ul>
                    <li><a href="#home">Inicio</a></li>
                    <li><a href="#admin">Sobre Nosotros</a></li>
                    <li><a href="#contact">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;