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

router.get('/formSubmission', async function(req, res) {
  let gratitudeBodies = req.body.answer;
  // res.send(gratitudeBodies)
  // console.log(gratitudeBodies)
  let name = req.body.name;
  let location = req.body.location;

  // await knex('gratitude_messages').insert({
  //   body: gratitudeBodies,
  //   first_name: name,
  //   location: location
  // });

  response.redirect('/submit');
});



module.exports = router;
