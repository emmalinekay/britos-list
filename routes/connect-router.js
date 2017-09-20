const express = require('express');
const multer = require('multer');
const ConnectModel = require('../models/connect-model.js');
const router = express.Router();

const myUploader = multer(
  {
    dest: __dirname + '/../public/uploads/'
  }
);

router.get('/dashboard', (req, res, next) => {
  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }
    res.render('connect-views/dashboard.ejs');
});




router.get('/connections', (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }

    ConnectModel.find((err, allConnections) => {
        if (err) {
            next(err);
            return;
        }

        res.locals.listOfConnections = allConnections;
        res.render('connect-views/connect-list.ejs');

    });
});

router.get('/connections/full-list', (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }

    ConnectModel.find((err, allConnections) => {
        if (err) {
            next(err);
            return;
        }

        res.locals.listOfConnections = allConnections;
        res.render('connect-views/full-list.ejs');

    });
});

router.post('/connections', myUploader.single('photo'), (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }

  //FN
// console.log(!req.file.filename);

  const theConnection = new ConnectModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    photoUrl: '/uploads/user-icon.jpg',
    email: req.body.emailValue,
    company: req.body.company,
    phoneNumber: req.body.phoneNumber,
    socialLink: req.body.socialLink,
    originOfConnection: req.body.originOfConnection,
    description: req.body.connectDescription,
    owner: req.user._id
  });

  if (req.file) {
    theConnection.photoUrl = '/uploads/' + req.file.filename;
  }

// THE CONN
console.log(theConnection.photoUrl);

    theConnection.save((err) => {
      if(err) {
        next(err);
        return;
      }
      req.flash('connectionFeedback', 'Connection Added.');
      res.redirect('/connections');
    });
});

router.get('/connections/:connectId', (req, res, next) => {
  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }

    ConnectModel.findById(
      req.params.connectId,

      (err, connectFromDb) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.connectInfo = connectFromDb;
          res.render('connect-views/connect-pages.ejs');
      }
    );
});

//edit connections --------------------

router.get('/connections/:connectId/edit', (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }

    ConnectModel.findById(
        req.params.connectId,

        (err, connectFromDb) => {
            if (err) {
                next(err);
                return;
            }

            res.locals.connectInfo = connectFromDb;
            res.render('connect-views/connect-edit.ejs');
        }
    );
});


router.post('/connections/:connectId', myUploader.single('photo'), (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }

    ConnectModel.findById(
      req.params.connectId,

      (err, connectFromDb) => {
          if (err) {
              next(err);
              return;
          }

          console.log(req.body.photo);

          // update the product's fields to the ones from the form
          connectFromDb.firstName           = req.body.firstName;
          connectFromDb.lastName            = req.body.lastName;
          connectFromDb.jobTitle            = req.body.jobTitle;
          // connectFromDb.photoUrl            = '/uploads/' + req.file.filename;
          connectFromDb.email               = req.body.emailValue;
          connectFromDb.company             = req.body.company;
          connectFromDb.phoneNumber         = req.body.phoneNumber;
          connectFromDb.socialLink          = req.body.socialLink;
          connectFromDb.originOfConnection  = req.body.originOfConnection;
          connectFromDb.description         = req.body.connectDescription;
          connectFromDb.owner               = req.user._id;

          if (req.file) {
            connectFromDb.photoUrl = '/uploads/' + req.file.filename;
          }
          connectFromDb.save((err) => {
              if (err) {
                  next(err);
                  return;
              }
              console.log(connectFromDb.photoUrl);
              res.redirect('/connections/');
          });
      }
    );
});

// delete connections -------------------------

router.post('/connections/:connectId/delete', (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }

    ConnectModel.findByIdAndRemove(
      req.params.connectId,

      (err, connectInfo) => {
          if (err) {
              next(err);
              return;
          }

          res.redirect('/connections');
      }
    );
});


module.exports = router;
