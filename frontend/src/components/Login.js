import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Login.css";



const Login = () => {
    return (
        <>
            <div>
                <section>
                    <img src="../../favicon.ico" alt="logo" />
                    <h1>Nombre del restaurant</h1>
                </section>
                <form className='formu'>
                    <input type="text" placeholder="Usuario" />
                    <input type="text" placeholder="Contraseña" />
                    <button>Iniciar Sesión</button>
                    <Link to={'/register'}>Registrarse</Link>
                    <Link to={'/loginhelp'}>Olvidé mi contraseña</Link>
                    <Link to={'/register'}>Registrarse</Link>
                    <Link to={'/'}>Continuar como invitado</Link>
                </form>
            </div>
        </>
    );
}

export default Login;