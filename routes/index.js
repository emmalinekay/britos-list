const express = require('express');
const router  = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/about', (req, res, next) => {
  if(req.user === undefined) {
    req.flash('securityError', 'Log in to access info');
    res.redirect('/login');
    return;
  }
    res.render('connect-views/about.ejs');
});

module.exports = router;
