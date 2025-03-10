const models = require("../models");

async function sync() {
    await models.sequelize.sync();
    return models;
}

module.exports = sync;
