var express = require('express');
var router = express.Router();
let User = require('../model/user');
let passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('registerUser');
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/login', (req, res) => {
  res.render('loginUser');
});

router.post('/login', (req, res, next) => {
  let { email, password } = req.body;
  if (email && password) {
    User.findOne({ email }, (error, user) => {
      if (error) {
        next(error);
      } else {
        if (user) {
          user.verifyPassword(password, (error, result) => {
            if (error) {
              next(error);
            } else {
              if (result) {
                req.session.userId = user.id;
                console.log(req.session, result);
                res.send('User Logged In');
              } else {
                res.send('Password Incorrect');
              }
            }
          });
        } else {
          res.send('User not found');
        }
      }
    });
  } else {
    res.send('email or password is not present');
  }
});

router.get('/failure', (req, res) => {
  res.send('Fialed');
});

router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/failure' }),
  (req, res) => {
    res.send('Github Authenticated');
  }
);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure' }),
  (req, res) => {
    res.send('Google Authenticated');
  }
);

module.exports = router;
