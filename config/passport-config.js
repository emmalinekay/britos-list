const passport = require('passport');
const UserModel = require('../models/user-model.js');


passport.serializeUser((userFromDb, done) => {
    done(null, userFromDb._id);
});

passport.deserializeUser((idFromBowl, done) => {
    UserModel.findById(
      idFromBowl,

      (err, userFromDb) => {
          if (err) {
              done(err);
              return;
          }

          done(null, userFromDb);
      }
    );
});


const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
        usernameField: 'loginEmail',
        passwordField: 'loginPassword'
    },

    (emailValue, passValue, done) => {
        UserModel.findOne(
          { email: emailValue },

          (err, userFromDb) => {
              if (err) {
                  done(err);
                  return;
              }

              if (userFromDb === null) {
                  done(null, false, { message: 'Incorrect E-mail.' });
                  return;

              }
              const isGoodPassword =
                  bcrypt.compareSync(passValue, userFromDb.encryptedPassword);

              if (isGoodPassword === false) {
                  done(null, false, { message: 'Password is wrong. 💩' });
                  return;
              }
              done(null, userFromDb);
          }
        );
    }
  )
);
