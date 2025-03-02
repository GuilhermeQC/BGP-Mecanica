const express = require('express');
const clienteRoutes = require('./clienteRoutes');
const mecanicoRoutes = require('./mecanicoRoutes');
const veiculoRoutes = require('./veiculoRoutes');
const servicoRoutes = require('./servicoRoutes');
const pecaRoutes = require('./pecaRoutes');
const relatoriosRoutes = require('./relatoriosRoutes');

const router = express.Router();

router.use('/clientes', clienteRoutes);
router.use('/mecanicos', mecanicoRoutes);
router.use('/veiculos', veiculoRoutes);
router.use('/servicos', servicoRoutes);
router.use('/pecas', pecaRoutes);
router.use('/relatorios', relatoriosRoutes); 

module.exports = router;
