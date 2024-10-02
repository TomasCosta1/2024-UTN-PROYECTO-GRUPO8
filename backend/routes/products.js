const express = require('express');
const fs = require('fs');
const router = express.Router();

const filePath = './back.json';

// Leer JSON
const readFile = () => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return { products: [] };
    }
};

// Escribir en  JSON
const writeFile = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing file:', error);
    }
};

// Crear un nuevo producto
router.post('/', (req, res) => {
    const data = readFile();
    const products = data.products;
    const newProduct = req.body;
    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(newProduct);
    writeFile(data);
    res.status(201).send(newProduct);
});

// Obtener todos los productos
router.get('/', (req, res) => {
    const data = readFile();
    res.status(200).send(data.products);
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
    const data = readFile();
    const product = data.products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).send();
    }
    res.status(200).send(product);
});

// Actualizar un producto por ID
router.patch('/:id', (req, res) => {
    const data = readFile();
    const products = data.products;
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send();
    }
    const updatedProduct = { ...products[index], ...req.body };
    products[index] = updatedProduct;
    writeFile(data);
    res.status(200).send(updatedProduct);
});

// Eliminar un producto por ID
router.delete('/:id', (req, res) => {
    const data = readFile();
    const products = data.products;
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send();
    }
    const deletedProduct = products.splice(index, 1);
    writeFile(data);
    res.status(200).send(deletedProduct);
});

module.exports = router;