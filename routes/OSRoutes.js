const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const servicos = await req.app.locals.database.OS.findAll();
        res.status(200).json(servicos);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { pecas, ...values } = req.body;
        const novoServico = await req.app.locals.database.OS.create({
            ...values,
            inicio: new Date(),
        });
        for (const peca of pecas) {
            await req.app.locals.database.PecaServico.create({
                servico_id: novoServico.id,
                peca_id: peca.id,
                quantidade: peca.qtd,
            });
        }
        res.json(novoServico);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;
