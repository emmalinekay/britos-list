const express = require('express');
const ProductModel = require('../models/connect-model.js');

const router = express.Router();

router.get('/connections/search', (req, res, next) => {
    res.render('filter-views/connect-search.ejs');
});

router.get('/connections/search-results', (req, res, next) => {
    const mySearchRegex = new RegExp(req.query.searchTerm, 'i');

    ConnectModel.find(
      { name: mySearchRegex },

      (err, searchResults) => {
          if (err) {
              next(err);
              return;
          }

          res.locals.lastSearch = req.query.searchTerm;
          res.locals.listOfResults = searchResults;
          res.render('filter-views/search-results.ejs');
      }
    );
}); // close GET /products/search-results


module.exports = router;
