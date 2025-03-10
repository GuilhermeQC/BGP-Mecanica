const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const clientes = await req.app.locals.Cliente.findAll();
    res.json(clientes);
});

router.post('/', async (req, res) => {
    const novoCliente = await req.app.locals.Cliente.create(req.body);
    res.json(novoCliente);
});

module.exports = router;
