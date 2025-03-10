const express = require('express');
const clienteRoutes = require('./clienteRoutes');
const servicoRoutes = require('./OSRoutes');
const pecaRoutes = require('./pecaRoutes');

const router = express.Router();

router.use('/clientes', clienteRoutes);
router.use('/os', servicoRoutes);
router.use('/estoque', pecaRoutes);

module.exports = router;
