const express = require('express');
const pool = require('../config/database');
const router = express.Router();

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { name, price, description, img, category } = req.body;
    
    const query = 'INSERT INTO products (name, price, `description`, img, category) VALUES (?, ?, ?, ?, ?)';
    
    try {
        const [result] = await pool.query(query, [name, price, description, img, category]);
        const newProduct = { id: result.insertId, name, price, description, img, category };
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
    const query = 'SELECT * FROM products';
    
    try {
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al buscar los productos:', error);
        res.status(500).json({ message: 'Error al buscar los productos', error: error.message });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    
    if (isNaN(productId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const query = 'SELECT * FROM products WHERE id = ?';
    
    try {
        const [results] = await pool.query(query, [productId]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error al buscar el producto:', error);
        res.status(500).json({ message: 'Error al buscar el producto', error: error.message });
    }
});

// Actualizar un producto por ID
router.patch('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    
    if (isNaN(productId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const { name, price, description, img, category } = req.body;
    const query = 'UPDATE products SET name = ?, price = ?, `description` = ?, img = ?, category = ? WHERE id = ?';
    
    try {
        const [result] = await pool.query(query, [name, price, description, img, category, productId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.status(200).json({ id: productId, name, price, description, img, category });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    
    if (isNaN(productId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    
    const query = 'DELETE FROM products WHERE id = ?';
    
    try {
        const [result] = await pool.query(query, [productId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        
        res.status(200).json({ message: `Producto con ID ${productId} eliminado exitosamente` });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
});

module.exports = router;
