import React, { createContext, useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";

export const UserContext=createContext()

export const UserProvider=({children}) => { // Define el proveedor del contexto del usuario
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [invitado, setInvitado] = useState(false);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    // Funciones para manejar los cambios en el estado del usuario
    const handleUser = (prop) => {
        setUser(prop);
    }

    const handlePass = (prop) => {
        setPass(prop);
    }

    const handleEmail = (prop) => {
        setEmail(prop);
    }

    const handleUserId = (prop) => {
        setUserId(prop);
    }

    const handleInvitado = () => {
        setInvitado(true);
    }

    const handleAdmin = () => {
        setAdmin(true);
    }

    const verify = async () => {
        if(!invitado) { // Verifica si el usuario no es un invitado
            const loginData = {
                email: email,
                pass: pass
            };
        
            try { // Realiza una solicitud GET al servidor con el email y la contraseña del usuario y verifica si el usuario es válido
                const response = await fetch(`http://localhost:3000/login/${loginData.email}/${loginData.pass}`, {
                    method: 'GET'
                }); 
        
                const data = await response.json();

                if (data.success) {
                    handleUserId(data.id);
                } else {
                    navigate("/login")
                }
            } catch (error) {
                navigate("/login")
            }
        }
    }

    const clearUser = () => { // Función para limpiar el estado del usuario
        setEmail("");
        setPass("");
        setUser("");
        setAdmin(false);
        setInvitado(false);
    }

    return ( // Retorna el proveedor del contexto del usuario con sus valores y funciones muy importantes
        <UserContext.Provider
        value={{
            user,
            pass,
            userId,
            email,
            invitado,
            admin,
            handleUser,
            handlePass,
            handleEmail,
            handleInvitado,
            handleAdmin,
            verify,
            clearUser
          }}
        >
            {children}
        </UserContext.Provider>
      );
}