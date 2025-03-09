const express = require('express');
const clienteRoutes = require('./clienteRoutes');
const servicoRoutes = require('./OSRoutes');
const pecaRoutes = require('./pecaRoutes');
const relatoriosRoutes = require('./relatoriosRoutes');
const login = require("./login");

const router = express.Router();

router.use('/clientes', clienteRoutes);
router.use('/servicos', servicoRoutes);
router.use('/pecas', pecaRoutes);
router.use('/relatorios', relatoriosRoutes);
router.use('/login', login);

module.exports = router;
