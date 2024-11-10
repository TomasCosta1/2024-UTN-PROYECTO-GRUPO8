const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Crear un nuevo cliente
router.post('/', async (req, res) => {
    const { name, email, pass } = req.body;
    
    const query = 'INSERT INTO clients (name, email, pass) VALUES (?, ?, ?)';
    
    try {
        const [result] = await pool.query(query, [name, email, pass]);
        const newClient = { id: result.insertId, name, email, pass };
        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
    }
});

// Obtener todos los clientes (sin pass)
router.get('/', async (req, res) => {
    const query = 'SELECT id, name, email, points FROM clients;';
    
    try {
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al buscar los clientes:', error);
        res.status(500).json({ message: 'Error al buscar los clientes', error: error.message });
    }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
    const clientId = parseInt(req.params.id);
    
    if (isNaN(clientId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const query = 'SELECT id, name, email, points FROM clients WHERE id = ?';
    
    try {
        const [results] = await pool.query(query, [clientId]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        
        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error al buscar el cliente:', error);
        res.status(500).json({ message: 'Error al buscar el cliente', error: error.message });
    }
});

// Actualizar un cliente por ID
router.patch('/:id', async (req, res) => {
    const clientId = parseInt(req.params.id);
    
    if (isNaN(clientId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const fields = [];
    const values = [];
    
    const { name, email, pass, points } = req.body;
    
    if (name !== undefined) {
        fields.push('name = ?');
        values.push(name);
    }
    if (email !== undefined) {
        fields.push('email = ?');
        values.push(email);
    }
    if (pass !== undefined) {
        fields.push('pass = ?');
        values.push(pass);
    }
    if (points !== undefined) {
        fields.push('points = ?');
        values.push(points);
    }
    
    if (fields.length === 0) {
        return res.status(400).json({ message: 'No hay campos para actualizar' });
    }
    
    const query = `UPDATE clients SET ${fields.join(', ')} WHERE id = ?`;
    values.push(clientId);
    
    try {
        const [result] = await pool.query(query, values);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        
        res.status(200).json({ id: clientId, ...req.body });
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
});

// Eliminar un cliente por ID
router.delete('/:id', async (req, res) => {
    const clientId = parseInt(req.params.id);
    
    if (isNaN(clientId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    // Eliminamos los detalles de la orden relacionados
    const deleteClientQuery = 'DELETE FROM clients WHERE id = ?';

    try {
        const [clientResult] = await pool.query(deleteClientQuery, [clientId]);

        if (clientResult.affectedRows === 0) {
            return res.status(404).json({ message: 'cliente no encontrado' });
        }

        res.status(200).json({ 
            message: `Cliente con ID ${clientId} eliminado exitosamente`,
        });
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
});


module.exports = router;