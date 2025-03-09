const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const clientes = await req.app.locals.Cliente.findAll({ include: Pessoa });
    res.json(clientes);
});

router.post('/', async (req, res) => {
    const novoCliente = await req.app.locals.Cliente.create({ pessoa_id: novaPessoa.id });
    res.json(novoCliente);
});

module.exports = router;
