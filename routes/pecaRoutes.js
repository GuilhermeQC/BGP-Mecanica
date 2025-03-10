const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const pecas = await req.app.locals.Estoque.findAll();
    res.json(pecas);
});

router.post('/', async (req, res) => {
    const novaPeca = await req.app.locals.Estoque.create(req.body);
    res.json(novaPeca);
});

module.exports = router;
