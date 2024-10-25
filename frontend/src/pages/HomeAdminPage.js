import React from 'react';
import '../styles/AdminPage.css';

const HomeAdminPage = () => {
    return (
        <div className='adminPage'>
            <h2>Home Admin</h2>
            <div>
                <h3>----- Aca apareceran las ordenes -----</h3>
                <a href="/admin/products" className='btnDefault'>Administrar Productos</a>
            </div>
        </div>
    );
};

export default HomeAdminPage;