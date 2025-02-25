const express = require('express');
const { Mecanico, Pessoa } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const mecanicos = await Mecanico.findAll({ include: Pessoa });
    res.json(mecanicos);
});

router.post('/', async (req, res) => {
    const novaPessoa = await Pessoa.create(req.body);
    const novoMecanico = await Mecanico.create({ pessoa_id: novaPessoa.id, funcao: req.body.funcao });
    res.json(novoMecanico);
});

module.exports = router;
 
