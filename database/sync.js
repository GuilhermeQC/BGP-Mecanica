const models = require("../models");

async function sync() {
    return await models.sequelize.sync();
}

module.exports = sync;
