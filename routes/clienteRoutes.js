const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const clientes = await req.app.locals.database.Cliente.findAll();
        res.status(200).json(clientes);
    } catch(err) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }
});

router.get('/single/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await req.app.locals.database.Cliente.findByPk(id);
        res.status(200).json(cliente);
    } catch(err) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const novoCliente = await req.app.locals.database.Cliente.create(req.body);
        res.status(200).json(novoCliente);
    } catch(err) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const { id, ...values } = req.body;
        const novoCliente = await req.app.locals.database.Cliente.update(values, { where: { id }});
        res.status(200).json(novoCliente);
    } catch(err) {
        console.log(err);
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;
