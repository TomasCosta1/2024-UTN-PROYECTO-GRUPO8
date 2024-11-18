import React, { createContext, useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";

export const UserContext=createContext()

export const UserProvider=({children}) => {
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const [invitado, setInvitado] = useState(false);
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

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
        if(!invitado) {
            const loginData = {
                email: email,
                pass: pass
            };
        
            try {
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

    const clearUser = () => {
        setEmail("");
        setPass("");
        setUser("");
        setAdmin(false);
        setInvitado(false);
    }

    return (
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