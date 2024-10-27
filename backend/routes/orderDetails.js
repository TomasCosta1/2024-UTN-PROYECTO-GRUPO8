const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Crear una nueva orderDetails
router.post('/', async (req, res) => {
    const { id_order, id_product, quantity, totalPrice } = req.body;
    
    const query = 'INSERT INTO orderDetails (id_order, id_product, quantity, totalPrice) VALUES (?, ?, ?, ?)';
    
    try {
        const [result] = await pool.query(query, [id_order, id_product, quantity, totalPrice]);
        const newOrderDetail = { id: result.insertId, id_order, id_product, quantity, totalPrice };
        res.status(201).json(newOrderDetail);
    } catch (error) {
        console.error('Error al crear la orderDetail:', error);
        res.status(500).json({ message: 'Error al crear la orderDetail', error: error.message });
    }
});

// Obtener todas las orderDetails
router.get('/', async (req, res) => {
    const query = 'SELECT * FROM orderDetails';
    
    try {
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al buscar las orderDetail:', error);
        res.status(500).json({ message: 'Error al buscar las orderDetail', error: error.message });
    }
});

// Obtener una orderDetails por ID
router.get('/:id', async (req, res) => {
    const orderDetailId = parseInt(req.params.id);
    
    if (isNaN(orderDetailId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const query = 'SELECT * FROM orderDetails WHERE id = ?';
    
    try {
        const [results] = await pool.query(query, [orderDetailId]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'OrderDetail no encontrada' });
        }
        
        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error al buscar la orderDetail:', error);
        res.status(500).json({ message: 'Error al buscar la orderDetail', error: error.message });
    }
});

// Obtener todas las orderDetails por id_orden
router.get('/order/:id', async (req, res) => {
    const orderId = parseInt(req.params.id);
    
    if (isNaN(orderId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const query = 'SELECT * FROM orderDetails WHERE id_order = ?';
    
    try {
        const [results] = await pool.query(query, [orderId]);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al buscar las orderDetail:', error);
        res.status(500).json({ message: 'Error al buscar las orderDetail', error: error.message });
    }
});

// Actualizar una orderDetails por ID
router.patch('/:id', async (req, res) => {
    const orderDetailId = parseInt(req.params.id);
    
    if (isNaN(orderDetailId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const { id_order, id_product, quantity, totalPrice } = req.body;
    const query = 'UPDATE orderDetails SET id_order = ?, id_product = ?, quantity = ?, totalPrice = ? WHERE id = ?';
    
    try {
        const [result] = await pool.query(query, [id_order, id_product, quantity, totalPrice, orderDetailId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'OrderDetail no encontrada' });
        }
        
        res.status(200).json({ id: orderDetailId, id_order, id_product, quantity, totalPrice });
    } catch (error) {
        console.error('Error al actualizar la orderDetail:', error);
        res.status(500).json({ message: 'Error al actualizar la orderDetail', error: error.message });
    }
});

// Eliminar una orderDetails por ID
router.delete('/:id', async (req, res) => {
    const orderDetailId = parseInt(req.params.id);
    
    if (isNaN(orderDetailId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const query = 'DELETE FROM orderDetails WHERE id = ?';
    
    try {
        const [result] = await pool.query(query, [orderDetailId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'OrderDetail no encontrada' });
        }
        
        res.status(200).json({ message: `OrderDetail con ID ${orderDetailId} eliminada exitosamente` });
    } catch (error) {
        console.error('Error al eliminar la orderDetail:', error);
        res.status(500).json({ message: 'Error al eliminar la orderDetail', error: error.message });
    }
});

module.exports = router;