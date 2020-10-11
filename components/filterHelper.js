const moment = require('moment');

const filter = (array, field, query, param) => {
  let output = [];
  if (!param) {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((arrayItem) => {
        if (isNaN(query)) {
          if (query.length === 4) {
            let max = arrayItem[field].length;
            let min = arrayItem[field].length - 4;
            if (
              arrayItem[field].toLowerCase().substring(min, max) ==
              query.toLowerCase()
            ) {
              var obj = {
                success: arrayItem.success,
                loans: [arrayItem],
              };
              output = [...output, obj];
            }
          } else {
            if (arrayItem[field].toLowerCase() == query.toLowerCase()) {
              var obj = {
                success: arrayItem.success,
                loans: [arrayItem],
              };
              output = [...output, obj];
            }
          }
        } else {
          if (query.length === 4 && arrayItem[field].length === 13) {
            if (arrayItem[field].substring(9, 13) == query) {
              var obj = {
                success: arrayItem.success,
                loans: [arrayItem],
              };
              output = [...output, obj];
            }
          } else {
            if (arrayItem[field] == query) {
              var obj = {
                success: arrayItem.success,
                loans: [arrayItem],
              };
              output = [...output, obj];
            }
          }
        }
      });
    });
  } else if (param === 'rounded') {
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((arrayItem) => {
        if (Math.ceil(arrayItem[field] / 100) * 100 == parseInt(query)) {
          var obj = {
            success: arrayItem.success,
            loans: [arrayItem],
          };
          output = [...output, obj];
        }
      });
    });
  } else if (param == 'approximate') {
    let date = moment(query, 'MMMM YYYY').format('YYYY-MM');
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((arrayItem) => {
        if (moment(arrayItem[field]).format('YYYY-MM') == date) {
          var obj = {
            success: arrayItem.success,
            loans: [arrayItem],
          };
          output = [...output, obj];
        }
      });
    });
  }
  return output;
};

module.exports = filter;
