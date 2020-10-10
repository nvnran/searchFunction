let searchArray = {
  success: true,
  loans: [
    {
      interestRate: '28',
      leadSource: 'a0d9000000OukoNAAR',
      disbursalDate: '2017-12-12',
      stageName: 'Current',
      createdDate: '2017-12-11T09:04:50.000+0000',
      emiAmount: '2744',
      upcomingEMIDates: [
        {
          date: '2019-12-05',
        },
      ],
      totalLoanAmount: '50000',
      leadSourceName: 'Shubhloans',
      maturityDate: '2019-12-05',
      name: 'DMI0000311015',
      currentFace: '2695',
      id: '0069000000yAJJ8AAO',
    },
  ],
};

$('#testForm').on('submit', (e) => {
  e.preventDefault();
  let loanResponse = searchArray;
  let searchType = testForm['searchType'].value;
  let searchCriteria = testForm['searchCriteria'].value;
  let parameters = testForm['parameters'].value;
  let data = {
    loanResponse,
    searchType,
    searchCriteria,
    parameters,
  };

  $.ajax({
    url: '/search/searchquery',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function (res) {
      console.log(res);
    },
  });
});

// let testForm = document.querySelector('#testForm');

// testForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   let loanResponse = searchArray;
//   let searchType = testForm['searchType'].value;
//   let searchCriteria = testForm['searchCriteria'].value;
//   let parameters = testForm['parameters'].value;
//   let data = {
//     loanResponse,
//     searchType,
//     searchCriteria,
//     parameters,
//   };
//   const output = async () => {
//     let result = await axios
//       .get('https://jsonplaceholder.typicode.com/users')
//       .then((res) => {
//         console.log(res);
//       });
//     return result;
//   };
// });
