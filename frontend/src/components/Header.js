import React, { useState, useEffect, useContext } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import ProfilePanel from './ProfilePanel';


const Header = () => {
    const { admin, clearUser, user } = useContext(UserContext);

    
    return (
        <header>
            <h1>Gestor de Restaurant</h1>
            { user && <Link className='profile' to='/profile' ><i class="fa-solid fa-user"></i></Link>}
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/aboutUs">Sobre Nosotros</Link></li>
                    <li><Link to="/contact">Contacto</Link></li>
                    {admin && <li><Link to="/admin">Admin Panel</Link></li>}
                </ul>
            </nav>
            <button className='logout' onClick={clearUser}><i class="fa-solid fa-right-from-bracket"></i></button>
        </header>
    );
};

export default Header;