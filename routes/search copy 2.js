const express = require('express');
const router = express.Router();
const moment = require('moment');

router.post('/searchRouter', (req, res) => {
  let searchQuery = req.body.searchCriteria.trim();
  let type = req.body.searchType;
  switch (type) {
    case 'leadSource':
      res.redirect(`/search/searchbyleadsource/${searchQuery}`);
      break;
    case 'name':
      res.redirect(`/search/searchbyloanname/${searchQuery}`);
      break;
    case 'disbursalDate':
      res.redirect(`/search/searchbydisbursaldate/${searchQuery}`);
      break;
    case 'totalLoanAmount':
      res.redirect(`/search/searchbyloanamount/${searchQuery}`);
      break;
    case 'leadSourceName':
      res.redirect(`/search/searchbyleadsourcename/${searchQuery}`);
      break;
    case 'maturityDate':
      res.redirect(`/search/searchbymaturitydate/${searchQuery}`);
      break;
    case 'emiAmount':
      res.redirect(`/search/searchbyemi/${searchQuery}`);
      break;
    case 'currentFace':
      res.redirect(`/search/searchbycurrentFace/${searchQuery}`);
      break;
    default:
      res.redirect(`/search/invalidsearchtype/${searchQuery}`);
      break;
  }
});

module.exports = router;
