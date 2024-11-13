const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Crear una nueva mesa
router.post('/', async (req, res) => {
    const status = 'Libre';
    
    const query = 'INSERT INTO tables (status) VALUES (?)';
    
    try {
        const [result] = await pool.query(query, status);
        const newTable = { id: result.insertId, status };
        res.status(201).json(newTable);
    } catch (error) {
        console.error('Error al crear la mesa:', error);
        res.status(500).json({ message: 'Error al crear la mesa', error: error.message });
    }
});

// Obtener todas las mesas
router.get('/', async (req, res) => {
    const query = 'SELECT * FROM tables';
    
    try {
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al buscar las mesas:', error);
        res.status(500).json({ message: 'Error al buscar las mesas', error: error.message });
    }
});

// Obtener una mesa por ID
router.get('/:id', async (req, res) => {
    const tableId = parseInt(req.params.id);
    
    if (isNaN(tableId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const query = 'SELECT * FROM tables WHERE id = ?';
    
    try {
        const [results] = await pool.query(query, [tableId]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Mesa no encontrada' });
        }
        
        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error al buscar la mesa:', error);
        res.status(500).json({ message: 'Error al buscar la mesa', error: error.message });
    }
});

// Actualizar una mesa por ID
router.patch('/:id', async (req, res) => {
    const tableId = parseInt(req.params.id);
    
    if (isNaN(tableId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const { status } = req.body;
    const query = 'UPDATE tables SET status = ? WHERE id = ?';
    
    try {
        const [result] = await pool.query(query, [status, tableId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mesa no encontrada' });
        }
        
        res.status(200).json({ id: tableId, status });
    } catch (error) {
        console.error('Error al actualizar la mesa:', error);
        res.status(500).json({ message: 'Error al actualizar la mesa', error: error.message });
    }
});

// Eliminar una mesa por ID
router.delete('/:id', async (req, res) => {
    const tableId = parseInt(req.params.id);
    
    if (isNaN(tableId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const query = 'DELETE FROM tables WHERE id = ?';
    
    try {
        const [result] = await pool.query(query, [tableId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mesa no encontrada' });
        }
        
        res.status(200).json({ message: `Mesa con ID ${tableId} eliminada exitosamente` });
    } catch (error) {
        console.error('Error al eliminar la mesa:', error);
        res.status(500).json({ message: 'Error al eliminar la mesa', error: error.message });
    }
});

module.exports = router;
