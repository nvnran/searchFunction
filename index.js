const express = require('express');
const path = require('path');
const searchRouter = require('./routes/search');
const dataGenerator = require('./data/dataGenerator');
const searchData = require('./data/searchData');
const filter = require('./components/filter');
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

app.post('/search/searchquery', (req, res) => {
  let output = filter(
    searchData,
    req.body.searchType,
    req.body.searchCriteria.trim(),
    req.body.parameters
  );
  res.render('search/output', {
    output: output,
  });
});

app.listen(5000);
