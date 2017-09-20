const express = require('express');
const multer = require('multer');
const UserModel = require('../models/user-model.js');
const router = express.Router();

const myUploader = multer(
  {
    dest: __dirname + '/../public/uploads/'
  }
);


// router.get('/your-profile', (req, res, next) => {
//
//
//     UserModel.find((err, user) => {
//         if (err) {
//             next(err);
//             return;
//         }
//
//         res.locals.userIn = user;
//         res.render('profile-views/profile-page.ejs');
//
//     });
// });

// router.post('/your-profile', myUploader.single('photo'), (req, res, next) => {
//
//   if(req.user === undefined) {
//     req.flash('securityError', 'Log in to access info');
//     res.redirect('/login');
//     return;
//   }
//
//
//   const theUser = new UserModel({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     jobTitle: req.body.jobTitle,
//     photoUrl: '/uploads/user-icon.jpg',
//     email: req.body.emailValue,
//     company: req.body.company,
//     phoneNumber: req.body.phoneNumber,
//     socialLink: req.body.socialLink,
//     owner: req.user._id
//   });
//
//   if (req.file) {
//     theUser.photoUrl = '/uploads/' + req.file.filename;
//   }
//
//
//     theUser.save((err) => {
//       if(err) {
//         next(err);
//         return;
//       }
//       req.flash('profileFeedback', 'Profile Updated.');
//       res.redirect('/your-profile');
//     });
// });

router.get('/your-profile', (req, res, next) => {
  // if(req.user === undefined) {
  //   req.flash('securityError', 'Log in to access info');
  //   res.redirect('/login');
  //   return;
  // }

    // UserModel.findById(
    //   req.params.userId,
    //
    //   (err, userFromDb) => {
    //       if (err) {
    //           next(err);
    //           return;
    //       }

          res.locals.userInfo = req.user;
          res.render('profile-views/profile-page.ejs');
    //   }
    // );
});

//edit connections --------------------

router.get('/your-profile/edit', (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }
    //
    // UserModel.findById(
    //     req.params.connectId,
    //
    //     (err, userFromDb) => {
    //         if (err) {
    //             next(err);
    //             return;
    //         }

            res.locals.userInfo = req.user;
            res.render('profile-views/profile-update.ejs');
    //     }
    // );
});


router.post('/your-profile/', myUploader.single('photo'), (req, res, next) => {

  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }
    //
    // UserModel.findById(
    //   req.params.userId,
    //
    //   (err, userFromDb) => {
    //       if (err) {
    //           next(err);
    //           return;
    //       }

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

              res.redirect('/your-profile/');
          });
    //   }
    // );
});

module.exports = router;
