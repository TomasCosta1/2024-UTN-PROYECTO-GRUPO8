const express = require('express');
const pool = require('../config/database');
const router = express.Router();

router.get('/', async (req, res) => {
    const { startFormatted, endFormatted } = req.query;
    const query = 'SELECT * FROM orders';
    const results = await pool.query(query);
    
    res.status(200).json(results[0]);
});

module.exports = router;