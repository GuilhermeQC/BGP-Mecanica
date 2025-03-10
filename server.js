const express = require('express');
const cors = require('cors');
const sync = require("./database/sync");
const routes = require('./routes');

(async () => {
    try {
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.locals.database = await sync();
        app.use('/api', routes);

        app.listen(3000, () => {
            console.log('Servidor rodando em http://localhost:3000/api/');
        });
    } catch (err) {
        console.log(err);
    }
})();
