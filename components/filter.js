const moment = require('moment');

const filter = (array, field, query, param) => {
  let output = [];
  if (field == 'leadSource') {
    output = filterByLeadSource(array, field, query, param);
  } else if (field == 'name') {
    output = filterByName(array, field, query, param);
  } else if (field === 'totalLoanAmount') {
    output = filterByTotalLoanAmount(array, field, query, param);
  } else if (field === 'emiAmount') {
    output = filterByEmiAmount(array, field, query, param);
  } else if (field === 'leadSourceName') {
    output = filterByLeadSourceName(array, field, query, param);
  } else if (field === 'currentFace') {
    output = filterByCurrentFace(array, field, query, param);
  } else if (field === 'disbursalDate') {
    output = filterByDisbursalDate(array, field, query, param);
  } else if (field === 'maturityDate') {
    output = filterByMaturityDate(array, field, query, param);
  }
  return output;
};

const filterByLeadSource = (array, field, query, param) => {
  let output = [];
  if (query.length === 4) {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (loanItem[field].substring(14, 18) == query) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  } else {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (loanItem[field] === query) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  }
  return output;
};

const filterByName = (array, field, query, param) => {
  let output = [];
  if (query.length === 4) {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (loanItem[field].substring(9, 13) == query) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  } else {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (loanItem[field] === query) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  }
  return output;
};

const filterByTotalLoanAmount = (array, field, query, param) => {
  let output = [];
  array.forEach((arrayItem) => {
    arrayItem.loans.forEach((loanItem) => {
      if (loanItem[field] == parseInt(query)) {
        var obj = {
          success: arrayItem.success,
          loans: loanItem,
        };
        output = [...output, obj];
      }
    });
  });
  return output;
};

const filterByEmiAmount = (array, field, query, param) => {
  let output = [];
  array.forEach((arrayItem) => {
    arrayItem.loans.forEach((loanItem) => {
      if (loanItem[field] == parseInt(query)) {
        var obj = {
          success: arrayItem.success,
          loans: loanItem,
        };
        output = [...output, obj];
      }
    });
  });
  return output;
};

const filterByLeadSourceName = (array, field, query, param) => {
  let output = [];
  array.forEach((arrayItem) => {
    arrayItem.loans.forEach((loanItem) => {
      if (loanItem[field].toLowerCase() == query.toLowerCase()) {
        var obj = {
          success: arrayItem.success,
          loans: loanItem,
        };
        output = [...output, obj];
      }
    });
  });
  return output;
};

const filterByCurrentFace = (array, field, query, param) => {
  let output = [];
  if (param === 'rounded') {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (Math.ceil(loanItem[field] / 100) * 100 == parseInt(query)) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  } else {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (loanItem[field] == parseInt(query)) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  }
  return output;
};

const filterByDisbursalDate = (array, field, query, param) => {
  let output = [];
  let date = Date.parse(query);
  let parsedDate = moment(Date.parse(query)).format('YYYY-MM-DD');
  let longDate = moment(query, 'Do, MMMM YYYY').format('YYYY-MM-DD');
  if (!isNaN(date)) {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (loanItem[field] == parsedDate) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  } else {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (loanItem[field] == longDate) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  }

  return output;
};

const filterByMaturityDate = (array, field, query, param) => {
  let output = [];
  let date = Date.parse(query);
  let parsedDate = moment(Date.parse(query)).format('YYYY-MM-DD');
  let longDate = moment(query, 'Do, MMMM YYYY').format('YYYY-MM-DD');
  if (!isNaN(date)) {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (loanItem[field] == parsedDate) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  } else {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (loanItem[field] == longDate) {
          var obj = {
            success: arrayItem.success,
            loans: loanItem,
          };
          output = [...output, obj];
        }
      });
    });
  }

  return output;
};

module.exports = filter;
