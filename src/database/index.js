const kx = require("knex");

const kxFile = require("../../knexfile");

const knex = kx(kxFile["development"]);

module.exports = { knex };
