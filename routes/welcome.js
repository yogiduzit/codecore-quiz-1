const express = require('express');
const router = express.Router();

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
router.get('/', (req, res) => {
  res.render('pages/welcome');
});

router.post('/sign_in', (req, res) => {
  const username = req.body.username;

  res.cookie('username', username, {maxAge: COOKIE_MAX_AGE});
  res.redirect('/');
});

module.exports = router;