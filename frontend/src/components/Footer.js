import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footerTop">
                <div className="footerNav">
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="#about">Sobre Nosotros</a></li>
                        <li><a href="#contact">Contacto</a></li>
                    </ul>
                </div>
                <div className="footerSocial">
                    <ul>
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="footerBottom">
                <p>&copy; {new Date().getFullYear()} Grupo 8. Todos los derechos reservados.</p>
            </div>
            <script src="https://kit.fontawesome.com/50303851c6.js" crossorigin="anonymous"></script>
        </footer>
    );
};

export default Footer;