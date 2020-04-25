let Router = require('express-promise-router');
let router = new Router();

// Knex is a module used to generate SQL queries
// See http://knexjs.org/
let Knex = require('knex');
let dbConfig = require('./knexfile');
let knex = Knex(dbConfig[process.env.NODE_ENV]);
