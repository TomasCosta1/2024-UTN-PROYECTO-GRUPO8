const express = require('express');
const pool = require('../config/database');
const router = express.Router();
const mercadopago = require('mercadopago');

// Configura el token de acceso
const client = new mercadopago.MercadoPagoConfig({ accessToken: 'TEST-7966451524123650-111016-ffcfd21321e371537da6ef7d4b94f704-470921312' });

router.post('/', async (req, res) => {
    try {
        const payment = new mercadopago.Payment(client);
        console.log(req.body);
        
        const response = await payment.create({ body: req.body });

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;