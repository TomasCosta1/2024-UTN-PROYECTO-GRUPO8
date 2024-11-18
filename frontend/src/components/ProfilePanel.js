import React from 'react';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';


const ProfilePanel = () => { // Componente para mostrar el perfil del usuario y sus puntos
    const { userId } = useContext(UserContext); // Obtiene el userId del contexto del usuario
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:3000/clients/${userId}`); // Realiza una solicitud GET para obtener los datos del usuario
        console.log(response.data);
        setUser(response.data);
    }
    return (
        <div className='profilePanel'>
            <h2 style={{ color: '#333' }}>{user.name}</h2>
            <p style={{ color: '#777' }}>{user.email}</p>
            <p style={{ color: '#555' }}>Puntos: {user.points}</p>
        </div>
    );
};

export default ProfilePanel;