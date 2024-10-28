const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get("/:email/:pass", async (req, res) => {
    const email = req.params.email;
    const pass = req.params.pass;
    
    const query = "SELECT * FROM client WHERE email = ? AND pass = ?";
    try {
        const [results] = await pool.query(query, [email, pass]);
        if (results.length === 0) { 
            return res.status(404).json({success: false})
        } else {
            return res.status(200).json({success: true})
        }
    } catch (error) {
        console.log('Error en la consulta: ', error)
        res.status(500).json({message: 'Error: ', error: error.message})
    }
})

router.get("/test", (req, res) => {
    res.send("Ruta de prueba funcionando");
});


module.exports = router