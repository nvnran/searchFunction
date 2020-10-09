const express = require('express');
const router = express.Router();
const moment = require('moment');
const _ = require('underscore');
const searchData = require('../data/searchData');

router.post('/searchRouter', (req, res) => {
  let searchQuery = req.body.searchCriteria.trim();
  let type = req.body.searchType;
  var obj = {
    searchQuery: searchQuery,
    type: type,
  };
  res.send(`/search/searchresult/${obj}`);
});

module.exports = router;
