const sequelize = require('../config/database');

const Pessoa = require('./Pessoa');
const Cliente = require('./Cliente');
const Mecanico = require('./Mecanico');
const Veiculo = require('./Veiculo');
const Servico = require('./Servico');
const Peca = require('./Peca');
const PecaServico = require('./PecaServico');

sequelize.sync()
    .then(() => console.log('📦 Modelos sincronizados com o banco'))
    .catch(err => console.error('❌ Erro ao sincronizar:', err));

module.exports = { Pessoa, Cliente, Mecanico, Veiculo, Servico, Peca, PecaServico };
 
