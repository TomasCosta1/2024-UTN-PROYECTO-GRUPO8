import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";



const Login = () => {
    const navigate = useNavigate()

    const checkData = async (e) => {
        e.preventDefault()
        const userInput = document.getElementById("user").value
        const passInput = document.getElementById("pass").value
        const loginData = {
            email: userInput,
            pass: passInput
        }
        console.log(loginData);
        
        const response = await fetch(`http://localhost:3000/login/${loginData.email}/${loginData.pass}`);
        const data = await response.json()
        console.log(data.success)
        if (data.success) {
            navigate("/")
        } else {
            alert("Credenciales invalidas.")
        }

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