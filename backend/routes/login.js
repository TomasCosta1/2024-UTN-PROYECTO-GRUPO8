const express = require('express');
const pool = require('../config/database');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get("/:email/:pass", async (req, res) => {
    const email = req.params.email;
    const pass = req.params.pass;
    
    try {
        // Buscar el usuario por email
        const [user] = await pool.query("SELECT * FROM clients WHERE email = ?", [email]);
        
        if (user.length === 0) {
            // Si no encuentra el usuario, devuelve error
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        // Obtiene el hash de la contraseña del usuario de la base de datos
        const userPasswordHash = user[0].pass;

        // Compara la contraseña ingresada con el hash almacenado
        const passwordMatch = await bcrypt.compare(pass, userPasswordHash);
        
        if (passwordMatch) {
            // Si coinciden, login exitoso
            return res.status(200).json({ success: true, message: "Inicio de sesión exitoso", id: user[0].id, name: user[0].name, admin: user[0].admin });
        } else {
            // Si no coinciden, devuelve error
            return res.status(401).json({ success: false, message: "Credenciales inválidas" });
        }
    } catch (error) {
        console.error("Error al verificar la contraseña:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
});

router.get("/test", (req, res) => {
    res.send("Ruta de prueba funcionando");
});

module.exports = router;
