const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const UserModel = require('../models/user-model.js');

const router = express.Router();


router.get('/login', (req, res, next) => {

    if(req.user) {
      res.redirect('/');
      return;
    }

    res.locals.flashError = req.flash('error');
    res.locals.logoutFeedback = req.flash('logoutSuccess');
    res.locals.securityFeedback = req.flash('securityError');

    res.render('auth-views/login-form.ejs');
});


router.post('/process-login',  //connects to login-form action
  passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
  })
);

router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('logoutSuccess', 'Log out successful.');

    res.redirect('/login');
});


router.get('/signup', (req, res, next) => {

  if(req.user) { //redirect to home if you're already logged in
    res.redirect('/');
    return;
  }

    res.render('auth-views/signup-form.ejs');
});

router.post('/process-signup', (req, res, next) => { //connects to signup form input

  //check if they left something blank
    if (req.body.signupEmail === "" || req.body.signupPassword === "") {
        res.locals.feedbackMessage = 'We need both email and password.';
        res.render('auth-views/signup-form.ejs');
        return;
    }

    // check if there's a user with that email
    UserModel.findOne(
      { email: req.body.signupEmail },

      (err, userFromDb) => {
          if (err) {
              next(err);
              return;
          }


          if (userFromDb) {
              res.locals.feedbackMessage = 'Email taken.';
              res.render('auth-views/signup-form.ejs');
              return;
          }

          const salt = bcrypt.genSaltSync(10); //encrypt password
          const scrambledPass = bcrypt.hashSync(req.body.signupPassword, salt);

          const theUser = new UserModel({
              email: req.body.signupEmail,
              encryptedPassword: scrambledPass
          });

          theUser.save((err) => {  //save user
              if (err) {
                  next(err);
                  return;
              }

              req.flash('signupSuccess', 'Sign up successful! Try logging in.');
              res.redirect('/'); //brings them back home
          });
      }
    );
});


module.exports = router;
