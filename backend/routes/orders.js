const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Crear una nueva orden
router.post('/', async (req, res) => {
    const { id_client, id_table, totalPrice } = req.body;
    
    const query = 'INSERT INTO orders (id_client, id_table, totalPrice) VALUES (?, ?, ?)';
    
    try {
        const [result] = await pool.query(query, [id_client, id_table, totalPrice]);
        const newOrder = { id: result.insertId, id_client, id_table, totalPrice };
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ message: 'Error al crear la orden', error: error.message });
    }
});

// Obtener todas las ordenes
router.get('/', async (req, res) => {
    const query = 'SELECT * FROM orders';
    
    try {
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al buscar las ordenes:', error);
        res.status(500).json({ message: 'Error al buscar las ordenes', error: error.message });
    }
});

// Obtener una orden por ID
router.get('/:id', async (req, res) => {
    const orderId = parseInt(req.params.id);
    
    if (isNaN(orderId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const query = 'SELECT * FROM orders WHERE id = ?';
    
    try {
        const [results] = await pool.query(query, [orderId]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        
        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error al buscar la orden:', error);
        res.status(500).json({ message: 'Error al buscar la orden', error: error.message });
    }
});

// Actualizar una orden por ID
router.patch('/:id', async (req, res) => {
    const orderId = parseInt(req.params.id);
    
    if (isNaN(orderId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const { id_client, id_table, totalPrice } = req.body;
    const query = 'UPDATE orders SET id_client = ?, id_table = ?, totalPrice = ? WHERE id = ?';
    
    try {
        const [result] = await pool.query(query, [id_client, id_table, totalPrice, orderId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }
        
        res.status(200).json({ id: orderId, id_client, id_table, totalPrice });
    } catch (error) {
        console.error('Error al actualizar la orden:', error);
        res.status(500).json({ message: 'Error al actualizar la orden', error: error.message });
    }
});

// Eliminar una orden por ID
router.delete('/:id', async (req, res) => {
    const orderId = parseInt(req.params.id);
    
    if (isNaN(orderId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    // Eliminamos los detalles de la orden relacionados
    const deleteOrderDetailsQuery = 'DELETE FROM orderDetails WHERE id_order = ?';
    const deleteOrderQuery = 'DELETE FROM orders WHERE id = ?';

    try {
        const [detailsResult] = await pool.query(deleteOrderDetailsQuery, [orderId]);
        const [orderResult] = await pool.query(deleteOrderQuery, [orderId]);

        if (orderResult.affectedRows === 0) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.status(200).json({ 
            message: `Orden con ID ${orderId} eliminada exitosamente`,
            deletedOrderDetails: detailsResult.affectedRows
        });
    } catch (error) {
        console.error('Error al eliminar la orden:', error);
        res.status(500).json({ message: 'Error al eliminar la orden', error: error.message });
    }
});


module.exports = router;