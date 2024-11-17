import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ handleUser, handleEmail, handlePass, handleInvitado, handleAdmin}) => {
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
                if(data.admin === 1){
                    handleAdmin()
                    alert("NASHEEE")
                    navigate("/admin");
                }else{
                    navigate("/");
                }
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
                <h2 className='title'>Iniciar Sesión</h2>
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

export default Login;