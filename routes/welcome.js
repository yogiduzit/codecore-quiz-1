const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

router.use(express.urlencoded({extended: true}));

router.use(cookieParser());

router.use((req, res, next) => {
  res.locals.username = "";

  const username = req.cookies.username;
  if (username) {
    res.locals.username = username;
  }
  next();
});

router.get('/', (req, res) => {
  const username = res.locals.username;
  res.render('pages/welcome', {username});
});

router.post('/sign_in', (req, res) => {
  const username = req.body.username;

  res.cookie('username', username, {maxAge: COOKIE_MAX_AGE});
  res.redirect('/');
});

router.post('/sign_out', (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
});

module.exports = router;