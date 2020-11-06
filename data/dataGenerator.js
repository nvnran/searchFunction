// The Hardcoded Data in searchData.js was created using this

let faker = require('faker');
let moment = require('moment');

let random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let sourceArr = ['Shubhloans', 'Samsung'];
let source = sourceArr[Math.floor(Math.random() * sourceArr.length)];

let genDates = (date, count) => {
  let obj = [];
  let firstDate = moment(date).format('YYYY-MM-DD');
  let newdate = firstDate;
  for (let i = 0; i < count; i++) {
    let tDate = { date: newdate };
    obj = [...obj, tDate];
    newDate = moment(newdate).add(1, 'months');
  }
  return obj;
};

let lSource =
  Math.random().toString(36).substr(2, 1) +
  '0' +
  Math.random().toString(36).substr(2, 1) +
  Math.random().toString(10).substr(2, 1) +
  '000000' +
  Math.random().toString(36).substr(2, 1).toUpperCase() +
  Math.random().toString(36).substr(2, 3) +
  Math.random().toString(36).substr(2, 4).toUpperCase();

let lsId =
  '00' +
  Math.random().toString(9).substr(2, 2) +
  '000000' +
  Math.random().toString(36).substr(2, 1) +
  Math.random().toString(36).substr(2, 3).toUpperCase() +
  Math.random().toString(9).substr(2, 1) +
  Math.random().toString(36).substr(2, 3).toUpperCase();

let createdDate = faker.date.past();
let disbursalDate = moment(createdDate).add(2, 'days').format('YYYY-MM-DD');
let stageName = 'Current';
let interestRate = random(25, 30);
let emiAmount = Math.ceil(random(2500, 4000) / 100) * 100;
let count = random(1, 4);
let upcomingEMIDates = genDates(faker.date.future(), count);
let totalLoanAmount = emiAmount * 48;
let leadSourceName = source;
let maturityDate = moment(upcomingEMIDates[count - 1].date)
  .add(1, 'months')
  .format('YYYY-MM-DD');
let name = 'DMI0000' + random(300000, 400000);
let currentFace = emiAmount + random(150, 300);

let loans = {
  interestRate,
  leadSource: lSource,
  disbursalDate,
  stageName,
  createdDate,
  emiAmount,
  upcomingEMIDates,
  totalLoanAmount,
  leadSourceName,
  maturityDate,
  name,
  currentFace,
  id: lsId,
};

let loanResponse = {
  success: true,
  loans: [loans],
};

module.exports = loanResponse;
