const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pecas = await req.app.locals.database.Estoque.findAll();
        res.status(200).json(pecas);
    } catch (err) {
        res.status(500).json({ msg: err.msg });
    }
});

router.get('/single/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pecas = await req.app.locals.database.Estoque.findByPk(id);
        res.status(200).json(pecas);
    } catch (err) {
        res.status(500).json({ msg: err.msg });
    }
});

router.post('/', async (req, res) => {
    try {
        const novaPeca = await req.app.locals.database.Estoque.create(req.body);
        res.status(200).json(novaPeca);
    } catch (err) {
        res.status(500).json({ msg: err.msg });
    }
});

router.put('/', async (req, res) => {
    try {
        const { id, ...values } = req.body;
        const novaPeca = await req.app.locals.database.Estoque.update(values, { where: { id } });
        res.status(200).json(novaPeca);
    } catch (err) {
        res.status(500).json({ msg: err.msg });
    }
});

router.post("/change", async (req, res) => {
    try {
        let updateValue;
        const { id, action, qtd } = req.body;
        if  (action !== "atualizar") {
            const quantidade_atual = await req.app.locals.database.Estoque.findOne( { where: { id }, attributes: ["quantidade"] } ).then(value => value.dataValues?.quantidade || null);
            updateValue = action === "somar" ? parseFloat(quantidade_atual) + parseFloat(qtd) : parseFloat(quantidade_atual) - parseInt(qtd);
        }
        const novaPeca = await req.app.locals.database.Estoque.update({
            quantidade: action !== "atualizar" ? updateValue : qtd,
        }, { where: { id } });
        res.status(200).json(action !== "atualizar" ? updateValue : qtd);
    } catch (err) {
        res.status(500).json({ msg: err.msg });
    }
});

module.exports = router;
