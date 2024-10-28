import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Login.css";
import axios from 'axios';



const Login = () => {
    const [user, setUser ] = useState(null)
    const [pass, setPass ] = useState(null)

    const checkData = async (e) => {
        e.preventDefault()
        const userInput = document.getElementById("user")
        const passInput = document.getElementById("pass")
        setUser("userInput.value")
        setPass("passInput.value")
        const data = {
            email: user,
            pass: pass
        }
        await axios.get("http://localhost:3000/checkLogin", data)
    }

    return (
        <div className='bodyLogin'>
            <div className='all'>
                <section className='photo'>
                    <img src="../../favicon.ico" alt="logo" />
                </section>
                <form>
                    <h2>Iniciar Sesión</h2>
                    <input id="user" type="text" className="inputbox" placeholder="Usuario" required />
                    <input id="pass" type="password" className="inputbox" placeholder="Contraseña" required />
                <section className='continue-forgot'>
                    <Link to={'/loginhelp'} className='forgot'>Olvidé mi contraseña</Link>
                    <Link to={'/'} className='continue'>Continuar como invitado</Link>
                </section>
                <button type='submit' className='enter' onClick={checkData}>Iniciar Sesión</button>
                <section className='register'>   
                <p>¿No tiene cuenta?<Link to={'/register'} className='register-link'> Registrarse</Link></p>
                </section>
                </form>
            </div>
        </div>
    );
}

export default Login;

// remember me? se pone en este caso?