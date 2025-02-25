const express = require('express');
const { Peca } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const pecas = await Peca.findAll();
    res.json(pecas);
});

router.post('/', async (req, res) => {
    const novaPeca = await Peca.create(req.body);
    res.json(novaPeca);
});

module.exports = router;
 
