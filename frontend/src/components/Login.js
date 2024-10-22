import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Login.css";



const Login = () => {
    return (
        <>
            <div className='all'>
                <section className='photo'>
                    <img src="../../favicon.ico" alt="logo" />
                </section>
                <form>
                    <h2>Iniciar Sesión</h2>
                    <input type="text" className="inputbox" placeholder="Usuario"  required />
                    <input type="password" className="inputbox" placeholder="Contraseña" required />
                <section className='continue-forgot'>
                    <Link to={'/loginhelp'} className='forgot'>Olvidé mi contraseña</Link>
                    <Link to={'/'} className='continue'>Continuar como invitado</Link>
                </section>
                <button type='submit' className='enter'>Iniciar Sesión</button>
                <section className='register'>   
                <p>¿No tiene cuenta?<Link to={'/register'} className='register-link'> Registrarse</Link></p>
                </section>
                </form>
            </div>
        </>
    );
}

export default Login;

// remember me? se pone en este caso?