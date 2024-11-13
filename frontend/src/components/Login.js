import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ handleUser, handleEmail, handlePass, handleInvitado }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const checkData = async (e) => {
        e.preventDefault();
    
        const loginData = {
            email: form.email,
            pass: form.password
        };
    
        try {
            const response = await fetch(`http://localhost:3000/login/${loginData.email}/${loginData.pass}`, {
                method: 'GET'
            });
    
            const data = await response.json();
            console.log("Respuesta del servidor:", data);
    
            if (data.success) {
                handleUser(data.name);
                handleEmail(loginData.email);
                handlePass(loginData.pass);
                navigate("/");
            } else {
                toast.error('Credenciales inválidas.', { theme: "colored" });
            }
        } catch (error) {
            console.error("Error al intentar iniciar sesión:", error);
            toast.error('Error en el servidor. Intente nuevamente.', { theme: "colored" });
        }
    };
    
    return (
        <div className="background">
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={checkData}>
                    <div className="input-group">
                        <input
                            id="user"
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            id="pass"
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="enter">Iniciar Sesión</button>
                    <div className="extra">
                        <p>¿No tiene cuenta?<Link to="/register" className="register-link"> Registrarse</Link></p>
                        <Link to="/" className="continue" onClick={handleInvitado}>Continuar como invitado</Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

/*const Login = () => {
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
            const notify = () => toast.error('Credenciales invalidas.', {theme  : "colored"});
            notify();
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
            <ToastContainer />
        </div>
    );
}*/

export default Login;

// remember me? se pone en este caso?