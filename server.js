const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

sequelize.sync()
    .then(() => console.log('Banco de dados sincronizado'))
    .catch(err => console.error('Erro ao sincronizar:', err));

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
 
