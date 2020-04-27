// let express = require('express')
// let app = express();
// let router = express.Router()

let Router = require('express-promise-router');
let router = new Router();

// Knex is a module used to generate SQL queries
// See http://knexjs.org/
let Knex = require('knex');
let dbConfig = require('./knexfile')
let knex = Knex(dbConfig[process.env.NODE_ENV]);

router.get('/', function(req, res) {
  res.render('main')
});

router.get('/prompts', function(req,res) {
  res.render('prompts')
})

router.get('/submit', async function(req, res) {
  let gratitudeMessages = await knex('gratitude_messages').select('*').orderBy('created_at', 'DESC');

  res.render('submit', { gratitudeMessages });
});

router.post('/formSubmission', async function(req, res) {
  let body = req.body.body;
  let first_name = req.body.first_name;
  let location = req.body.location;

  await knex('gratitude_messages').insert({
    body: body,
    first_name: first_name,
    location: location
  });

  res.redirect('/submit');
});

module.exports = router;
