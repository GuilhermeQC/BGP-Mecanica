const express = require('express');
const { Servico } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const servicos = await Servico.findAll();
    res.json(servicos);
});

router.post('/', async (req, res) => {
    const novoServico = await Servico.create(req.body);
    res.json(novoServico);
});

module.exports = router;
 
