const express = require('express');
const router = express.Router();
const knex = require('../db/client');
const ejslint = require('ejs-lint');

router.get('/new', (req, res) => {
  res.render('pages/new');
});

router.post('/', (req, res) => {
  let imgURL = "assets/img/placeholder.png"
  if (req.body.imgURL) {
    imgURL = req.body.imgURL;
  }
  knex
  .insert({
    content: req.body.content,
    img_url: imgURL,
    username: req.cookies.username
  })
  .into('clucks')
  .returning('*')
  .then(([cluck]) => {
    res.redirect('/clucks');
  });
});

router.get('/', (req, res) => {
  knex
  .select('*')
  .from('clucks')
  .orderBy('created_at', 'desc')
  .then(clucks => {
    res.render('pages/clucks', {clucks: clucks});
  });
});
module.exports = router;

