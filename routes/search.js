const express = require('express');
const router = express.Router();
const moment = require('moment');

const years = [
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
];

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
  'january',
  'february',
  'march',
  'april',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

router.post('/anything', (req, res) => {
  let searchItem = req.body.searchCriteria;
  let source = searchItem.trim();
  let type = isNaN(source);
  let notDate = isNaN(Date.parse(source));

  if (type) {
    if (notDate) {
      if (source.length === 18) {
        res.redirect(`/search/searchbyleadsource/${searchItem}`);
      } else if (source.toLowerCase() === 'shubhloans') {
        res.redirect(`/search/searchbyleadsourcename/${searchItem}`);
      } else if (months.includes(source.toLowerCase())) {
        res.redirect(`/search/searchbymonth/${searchItem}`);
      } else {
        res.redirect(`/search/notfound/${searchItem}`);
      }
    } else {
      res.redirect(`/search/searchbydisbursaldate/${searchItem}`);
    }
  } else {
    if (source.length > 4) {
      res.redirect(`/search/searchbyloanamount/${searchItem}`);
    } else if (source.length === 4 && years.includes(source)) {
      res.redirect(`/search/searchbyyear/${searchItem}`);
    } else if (source.length === 4 && !years.includes(source)) {
      res.redirect(`/search/searchbyemi/${searchItem}`);
    } else if (source.length === 2) {
      res.redirect(`/search/searchbyinterestrate/${searchItem}`);
    } else {
      res.redirect(`/search/notfound/${searchItem}`);
    }
  }
});

module.exports = router;
