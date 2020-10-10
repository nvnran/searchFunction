const moment = require('moment');

const filter = (array, field, query, param) => {
  let output = [];
  if (!param) {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (isNaN(query)) {
          if (query.length === 4) {
            let max = loanItem[field].length;
            let min = loanItem[field].length - 4;
            if (
              loanItem[field].toLowerCase().substring(min, max) ==
              query.toLowerCase()
            ) {
              var obj = {
                success: arrayItem.success,
                loans: [loanItem],
              };
              output = [...output, obj];
            }
          } else {
            if (loanItem[field].toLowerCase() == query.toLowerCase()) {
              var obj = {
                success: arrayItem.success,
                loans: [loanItem],
              };
              output = [...output, obj];
            }
          }
        } else {
          if (query.length === 4 && loanItem[field].length === 13) {
            if (loanItem[field].substring(9, 13) == query) {
              var obj = {
                success: arrayItem.success,
                loans: [loanItem],
              };
              output = [...output, obj];
            }
          } else {
            if (loanItem[field] == query) {
              var obj = {
                success: arrayItem.success,
                loans: [loanItem],
              };
              output = [...output, obj];
            }
          }
        }
      });
    });
  } else if (param === 'rounded') {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (Math.ceil(loanItem[field] / 100) * 100 == parseInt(query)) {
          var obj = {
            success: arrayItem.success,
            loans: [loanItem],
          };
          output = [...output, obj];
        }
      });
    });
  } else if (param == 'approximate') {
    let date = moment(query, 'MMMM YYYY').format('YYYY-MM');
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((loanItem) => {
        if (moment(loanItem[field]).format('YYYY-MM') == date) {
          var obj = {
            success: arrayItem.success,
            loans: [loanItem],
          };
          output = [...output, obj];
        }
      });
    });
  }
  return output;
};

module.exports = filter;
