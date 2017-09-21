const express = require('express');
const multer = require('multer');
const UserModel = require('../models/user-model.js');
const router = express.Router();

const myUploader = multer(
  {
    dest: __dirname + '/../public/uploads/'
  }
);


router.get('/your-profile', (req, res, next) => {

          res.locals.userInfo = req.user;
          res.render('profile-views/profile-page.ejs');

});


router.get('/your-profile/edit', (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }
            res.locals.userInfo = req.user;
            res.render('profile-views/profile-update.ejs');

});


router.post('/your-profile/', myUploader.single('photo'), (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }
          // update the product's fields to the ones from the form
          req.user.firstName           = req.body.firstName;
          req.user.lastName            = req.body.lastName;
          req.user.jobTitle            = req.body.jobTitle;
          // connectFromDb.photoUrl            = '/uploads/' + req.file.filename;
          req.user.email               = req.body.emailValue;
          req.user.company             = req.body.company;
          req.user.phoneNumber         = req.body.phoneNumber;
          req.user.socialLink          = req.body.socialLink;

          if (req.file) {
            req.user.photoUrl = '/uploads/' + req.file.filename;
          }
          
          req.user.save((err) => {
              if (err) {
                  next(err);
                  return;
              }

              res.redirect('/your-profile');
          });
    //   }
    // );
});

module.exports = router;
