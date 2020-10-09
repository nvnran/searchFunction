const express = require('express');
const _ = require('underscore');
const path = require('path');
const moment = require('moment');
const searchRouter = require('./routes/search');
const searchData = require('./data/searchData');
const dataGenerator = require('./data/dataGenerator');
const { format } = require('path');
const app = express();

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
  if (leadSource.length === 18) {
    searchData.forEach((item) => {
      item.loans.forEach((loanItem) => {
        if (loanItem.leadSource === leadSource) {
          output = [...output, item];
        }
      });
    });
  } else if (leadSource.length === 4) {
    searchData.forEach((item) => {
      item.loans.forEach((loanItem) => {
        if (loanItem.leadSource.substring(14, 18) === leadSource) {
          output = [...output, item];
        }
      });
    });
  }
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbyloanname/:name', (req, res) => {
  let name = req.params.name;
  let output = [];
  if (name.length === 13) {
    searchData.forEach((item) => {
      item.loans.forEach((loanItem) => {
        if (loanItem.name === name) {
          output = [...output, item];
        }
      });
    });
  } else if (name.length === 4) {
    searchData.forEach((item) => {
      item.loans.forEach((loanItem) => {
        if (loanItem.name.substring(9, 13) === name) {
          output = [...output, item];
        }
      });
    });
  }
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbydisbursaldate/:disbursalDate', (req, res) => {
  let disbursalDate = Date.parse(req.params.disbursalDate);
  let date = '';
  let output = [];
  if (isNaN(disbursalDate)) {
    date = moment(req.params.disbursalDate, 'Do MMMM YYYY').format(
      'YYYY-MM-DD'
    );
  } else {
    date = moment(disbursalDate).format('YYYY-MM-DD');
    console.log(date);
  }
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (loanItem.disbursalDate === date) {
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
      if (loanItem.totalLoanAmount == loanAmount) {
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
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (loanItem.leadSourceName.toLowerCase() === sourceName.toLowerCase()) {
        output = [...output, item];
      }
    });
  });
  res.render('search/output', {
    output: output,
  });
});

app.get('/search/searchbymaturitydate/:maturityDate', (req, res) => {
  let maturityDate = Date.parse(req.params.maturityDate);
  let date = '';
  let output = [];
  if (months.includes(req.params.maturityDate)) {
    searchData.forEach((item) => {
      item.loans.forEach((loanItem) => {
        if (loanItem.maturityDate === date) {
          output = [...output, item];
        }
      });
    });
  }
  if (isNaN(maturityDate)) {
    date = moment(req.params.maturityDate, 'Do MMMM YYYY').format('YYYY-MM-DD');
  } else {
    date = moment(maturityDate).format('YYYY-MM-DD');
  }
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (loanItem.maturityDate === date) {
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

app.get('/search/searchbycurrentFace/:currentFace', (req, res) => {
  let currentFace = req.params.currentFace;
  let output = [];
  console.log(currentFace);
  searchData.forEach((item) => {
    item.loans.forEach((loanItem) => {
      if (
        Math.ceil(loanItem.currentFace / 100) * 100 ==
        Math.ceil(currentFace / 100) * 100
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

app.get('/search/invalidsearchtype/:searchItem', (req, res) => {
  let searchItem = req.params.searchItem;
  res.render('search/invalidsearchtype', {
    term: searchItem,
  });
});

app.get('/search/generatedata', (req, res) => {
  res.send(dataGenerator);
});

app.listen(5000);
