const moment = require('moment');

// The Main Filter function which returns the load details data being searched for.
// The function accepts 4 parameters:
// 1. The array to be searched within
// 2. The field type that the serach term belongs to
// 3. The search term
// 4. Optional parameters

const filter = (array, field, query, param) => {
  // Output Initialized
  let output = [];

  // Check if tere are optional Parameters specified
  if (!param) {
    //If no optional parameters are specified, loop through the array
    array.forEach((arrayItem) => {
      arrayItem.loans.forEach((arrayItem) => {
        // Check if the search term is a Number
        if (isNaN(query)) {
          //if the query is not a number and the length is 4 charactes, then we search for the last 4 characters of either Lead Source
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
            // search and match  field name and search term to fvalue of field name
            if (arrayItem[field].toLowerCase() == query.toLowerCase()) {
              var obj = {
                success: arrayItem.success,
                loans: [arrayItem],
              };
              output = [...output, obj];
            }
          }
        } else {
          // Searches Loan Name eiter by last 4 digits or 13 character loan name
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
    // If optional parameters are provided for Emi amount or Current Face, value is searched to ne nearest 100 rounded up
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
