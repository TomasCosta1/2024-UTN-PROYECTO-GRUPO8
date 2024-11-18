import "../styles/Register.css";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

const Register = () => { // Realiza una solicitud GET para obtener los datos del usuario
    const [form, setForm] = useState({
        nombreCompleto: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState(""); // Estado para manejar la confirmación de la contraseña

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "confirmPassword") {
            setConfirmPassword(value);
        } else {
            setForm({ ...form, [name]: value }); // Actualiza el estado del formulario
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        if (form.password !== confirmPassword) { // Verifica si las contraseñas coinciden
            toast.error("Las contraseñas no coinciden");
            return;
        }

        try {
            const result = await axios.post("http://localhost:3000/register", form); // Realiza una solicitud POST para registrar al usuario y te advierte si el usuario ya existe o varios errores
            const data = result.data;

            if (data.success) {
                toast.success("Registro exitoso");
            } else if (data.message === "El usuario ya existe.") {
                toast.error("El usuario ya está registrado",  {theme: "colored"}); 
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("El correo electrónico ya está registrado.", {theme: "colored"});
            } else {
                console.error("Error en el registro:", error);
                toast.error("Hubo un problema con el registro. Inténtalo de nuevo.",  {theme: "colored"});
            }
        }
    };

    return (
        <div className="background">
            <div className="registerContainer">
                <h2 className="title">Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            id="name"
                            type="text"
                            name="nombreCompleto"
                            placeholder="Nombre Completo"
                            value={form.nombreCompleto}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            id="email"
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
                    <div className="input-group">
                        <input
                            id="confirPass"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-btn">
                        Registrarse
                    </button>
                    <div className="extra">
                    <p>¿Tiene cuenta?<Link to="/login" className="login-link"> Iniciar Sesión</Link></p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;