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

router.get('/anxietytips', function(req, res) {
  res.render('panicTips')
});

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
router.post('/formpromptsubmission', async function(req, res) {
  let body1 = req.body.body1;
  console.log('this is body1', body1)
  let body2 = req.body.body2;
  console.log('this is body2', body2)
  let body3 = req.body.body3;
  console.log('this is body3', body3)
  let body4 = req.body.body4;
  console.log('this is body4', body4)
  let first_name = req.body.first_name;
  let location = req.body.location;

  await knex('gratitude_messages').insert({
    body: body1 + ', ' + body2 + ', ' + body3 + ', ' + body4,
    first_name: first_name,
    location: location
  });

  res.redirect('/submit');
});

module.exports = router;
