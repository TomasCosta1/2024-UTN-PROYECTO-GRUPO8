const express = require('express');
const bcrypt = require('bcryptjs');  // Librería para hash
const pool = require('../config/database');  // Conexión a la base de datos
const router = express.Router();

router.post('/', async (req, res) => {
    const { nombreCompleto, email, password } = req.body;

    // Validación de datos
    if (!nombreCompleto || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }


    try {
        // Verificar si el usuario ya existe en la base de datos
        const [existingUser] = await pool.query("SELECT * FROM clients WHERE email = ?", [email]);
    
        if (existingUser.length > 0) {
            // Responder con un código 409 (conflicto) si el usuario ya existe
            return res.status(409).json({ success: false, message: "El usuario ya existe." });
        }
        
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insertar el nuevo usuario en la base de datos
        const query = "INSERT INTO clients (name, email, pass) VALUES (?, ?, ?)";
        await pool.query(query, [nombreCompleto, email, hashedPassword]);
    
        // Respuesta exitosa
        res.status(201).json({ success: true, message: "Usuario registrado correctamente." });
    } catch (error) {
        // Manejar errores en el servidor
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ success: false, message: "Error en el servidor." });
    }
    
});

module.exports = router;
