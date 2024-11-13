import "../styles/Register.css"
import React, { useState } from 'react';
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({
        nombreCompleto: "",
        email: "",
        password: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "confirmPassword") {
            setConfirmPassword(value);
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log(form);
        
        const result = await axios.post("http://localhost:3000/register", form);
        const data = result.data;
        console.log(data);
        

        console.log("Formulario de registro enviado:", form);
    };

    return (
        <div className="background">
            <div className="registerContainer">
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            id='name'
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
                            id='email'
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
                            id='pass'
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
                            id='confirPass'
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="register-btn">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
