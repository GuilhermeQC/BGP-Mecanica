const express = require('express');
const { Servico } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const servicos = await req.app.locals.OS.findAll();
    res.json(servicos);
});

router.post('/', async (req, res) => {
    const novoServico = await req.app.locals.OS.create(req.body);
    res.json(novoServico);
});

module.exports = router;
