import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Grupo 8. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;