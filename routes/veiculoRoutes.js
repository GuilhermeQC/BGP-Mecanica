const express = require('express');
const { Veiculo } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const veiculos = await Veiculo.findAll();
    res.json(veiculos);
});

router.post('/', async (req, res) => {
    const novoVeiculo = await Veiculo.create(req.body);
    res.json(novoVeiculo);
});

module.exports = router;
 
