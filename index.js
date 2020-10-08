const express = require('express');
const _ = require('underscore');
const path = require('path');
const moment = require('moment');
const searchRouter = require('./routes/search');
const searchData = require('./data/searchData');
const dataGenerator = require('./data/dataGenerator');
const app = express();

app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('search/index', {
    output: searchData,
  });
});

app.use('/search', searchRouter);

app.get('/search/searchbyleadsource/:leadSource', (req, res) => {
  let leadSource = req.params.leadSource;
  let output = [];
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (loanItem.leadSource === leadSource || loanItem.id === leadSource) {
        output = [...output, item];
      }
    });
  });
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbyleadsourcename/:sourceName', (req, res) => {
  let sourceName = req.params.sourceName;
  let output = [];
  let term = 'shubhloans';
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (loanItem.leadSourceName.toLowerCase() === term) {
        output = [...output, item];
      }
    });
  });
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbyloanamount/:loanAmount', (req, res) => {
  let loanAmount = parseInt(req.params.loanAmount);
  let output = [];
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (loanItem.totalLoanAmount === loanAmount) {
        output = [...output, item];
      }
    });
  });

  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbydisbursaldate/:disbursalDate', (req, res) => {
  let disbursalDate = req.params.disbursalDate;
  let output = [];
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (loanItem.disbursalDate === disbursalDate) {
        output = [...output, item];
      }
    });
  });
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbyinterestrate/:interestRate', (req, res) => {
  let interestRate = parseInt(req.params.interestRate);

  let output = [];
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (loanItem.interestRate === interestRate) {
        output = [...output, item];
      }
    });
  });
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbyyear/:year', (req, res) => {
  let year = parseInt(req.params.year);
  let output = [];
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (moment(loanItem.disbursalDate).format('YYYY') == year) {
        output = [...output, item];
      }
    });
  });
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbyemi/:emiAmount', (req, res) => {
  let emiAmount = parseInt(req.params.emiAmount);
  let output = [];
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (loanItem.emiAmount === emiAmount) {
        output = [...output, item];
      }
    });
  });
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbymonth/:month', (req, res) => {
  let month = req.params.month;
  let output = [];
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (
        moment(loanItem.disbursalDate).format('MMM').toLowerCase() ==
        month.toLowerCase()
      ) {
        output = [...output, item];
      }
    });
  });
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/notfound/:searchItem', (req, res) => {
  let searchItem = req.params.searchItem;
  res.render('search/notfound', {
    details: searchItem,
  });
});

app.get('/search/generatedata', (req, res) => {
  res.send(dataGenerator);
});

app.listen(5000);
