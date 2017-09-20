const express      = require('express');
const ConnectModel = require('../models/connect-model.js');

const router = express.Router();

router.get('/connections/search', (req, res, next) => {
  console.log('hi');
    res.render('filter-views/connect-search.ejs');
});

router.get('/connections/search-results', (req, res, next) => {
    const mySearchRegex = req.query.searchTerm;

    ConnectModel.search(mySearchRegex, (err, searchResults) => {
          if (err) {
              next(err);
              return;
          }

          // res.locals.lastSearch = req.query.searchTerm;
          // res.locals.listOfResults = searchResults;
          res.render('filter-views/search-results.ejs', {
            lastSearch: mySearchRegex,
            listOfResults: searchResults
          });
      }
    );
}); // close GET /products/search-results


router.get('/connections/firstname', (req, res, next) => {
    ConnectModel
      .find()
      .sort({ firstName: 'ascending' })

      .exec((err, nameOrder) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.listOfNames = nameOrder;
          res.render('filter-views/firstname-results.ejs');
      });
});

router.get('/connections/lastname', (req, res, next) => {
    ConnectModel
      .find()
      .sort({ lastName: 'ascending' })

      .exec((err, nameOrder) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.listOfNames = nameOrder;
          res.render('filter-views/lastname-results.ejs');
      });
});

router.get('/connections/company', (req, res, next) => {
    ConnectModel
      .find()
      .sort({ company: 'ascending' })

      .exec((err, nameOrder) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.listOfNames = nameOrder;
          res.render('filter-views/company-results.ejs');
      });
});




module.exports = router;
