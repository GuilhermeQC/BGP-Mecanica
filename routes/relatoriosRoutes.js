const express = require('express');
const { Servico, Peca, PecaServico, Cliente, Veiculo, Mecanico } = require('../models');

const router = express.Router();

// 📌 Relatório de Serviços Realizados
router.get('/servicos', async (req, res) => {
    try {
        const servicos = await Servico.findAll({
            include: [
                { model: Veiculo },
                { model: Mecanico }
            ]
        });
        res.json(servicos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar relatório de serviços' });
    }
});

// 📌 Relatório de Peças Utilizadas
router.get('/pecas', async (req, res) => {
    try {
        const pecas = await Peca.findAll({
            include: [
                { model: PecaServico, include: [Servico] }
            ]
        });
        res.json(pecas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar relatório de peças' });
    }
});

// 📌 Relatório de Clientes e Veículos
router.get('/clientes-veiculos', async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            include: [Veiculo]
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar relatório de clientes e veículos' });
    }
});

module.exports = router;
 
