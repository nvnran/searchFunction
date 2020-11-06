const express = require('express');
const path = require('path');
const searchRouter = require('./routes/search');
const dataGenerator = require('./data/dataGenerator');
const searchData = require('./data/searchData');
const filter = require('./components/filterHelper');
const app = express();

app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Renders Home Page
app.get('/', (req, res) => {
  res.render('search/index', {
    output: searchData,
  });
});

// Absolutely Unnecessary but useful for testing
app.get('/test', (req, res) => {
  res.render('search/test');
});

// Initializing Search Router
app.use('/search', searchRouter);

// Search API Endpoint
app.post('/search/searchquery', (req, res) => {
  let data;
  if (!req.body.loanResponse) {
    data = searchData;
  } else {
    data = [JSON.parse(req.body.loanResponse)];
  }
  let output = filter(
    data,
    req.body.searchType,
    req.body.searchCriteria.trim(),
    req.body.parameters
  );
  res.render('search/output', {
    output: output,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
