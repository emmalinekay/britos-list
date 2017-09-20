const express = require('express');
const multer = require('multer');
const ConnectModel = require('../models/user-model.js');
const router = express.Router();

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
          // connectFromDb.photoUrl            = '/uploads/' + req.file.filename;
          connectFromDb.email               = req.body.emailValue;
          connectFromDb.company             = req.body.company;
          connectFromDb.phoneNumber         = req.body.phoneNumber;
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
