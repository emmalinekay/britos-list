const express = require('express');
const multer = require('multer');
const ConnectModel = require('../models/connect-model.js');
const router = express.Router();


router.get('/dashboard', (req, res, next) => {
  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }
    res.render('connect-views/dashboard.ejs');
});




router.get('/connections', (req, res, next) => {
    ConnectModel.find((err, allConnections) => {
        if (err) {
            next(err);
            return;
        }

        res.locals.listOfConnections = allConnections;
        res.render('connect-views/connect-list.ejs');
    });
});

router.post('/connections', (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }

    const theConnection = new ConnectModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.emailValue,
      phoneNumber: req.body.phoneNumber,
      originOfConnection: req.body.originOfConnection,
      description: req.body.connectDescription,
      owner: req.user._id 
    });

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


router.post('/connections/:connectId', (req, res, next) => {
    ConnectModel.findById(
      req.params.connectId,

      (err, connectFromDb) => {
          if (err) {
              next(err);
              return;
          }

          // update the product's fields to the ones from the form
          connectFromDb.firstName           = req.body.firstName;
          connectFromDb.lastName            = req.body.lastName;
          connectFromDb.email               = req.body.emailValue;
          connectFromDb.phoneNumber         = req.body.phoneNumber;
          connectFromDb.originOfConnection  = req.body.originOfConnection;
          connectFromDb.description         = req.body.connectDescription;
          connectFromDb.owner               = req.user._id;

          connectFromDb.save((err) => {
              if (err) {
                  next(err);
                  return;
              }

              res.redirect('/connections');
          });
      }
    );
});

// delete connections -------------------------

router.post('/connections/:connectId/delete', (req, res, next) => {
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
