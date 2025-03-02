const express = require('express');
const { Cliente, Pessoa } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const clientes = await Cliente.findAll({ include: Pessoa });
    res.json(clientes);
});

router.post('/', async (req, res) => {
    const novaPessoa = await Pessoa.create(req.body);
    const novoCliente = await Cliente.create({ pessoa_id: novaPessoa.id });
    res.json(novoCliente);
});

module.exports = router;
