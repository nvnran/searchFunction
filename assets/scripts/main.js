document.querySelector('#searchType').addEventListener('change', (e) => {
  let type = e.target.value;
  let elem = document.querySelector('#searchCriteria');
  switch (type) {
    case 'leadSource':
      elem.setAttribute('placeholder', 'ex: a0d9000000OukoNAAR or NAAR');
      break;
    case 'name':
      elem.setAttribute('placeholder', 'ex: DMI0000311015 or 1015');
      break;
    case 'disbursalDate':
      elem.setAttribute('placeholder', 'Enter Date');
      break;
    case 'totalLoanAmount':
      elem.setAttribute('placeholder', 'Enter Loan Amount');
      break;
    case 'leadSourceName':
      elem.setAttribute('placeholder', 'ex: Shubhloans, Samsung, Tata, .....');
      break;
    case 'maturityDate':
      elem.setAttribute('placeholder', 'Enter Date');
      break;
    case 'emiAmount':
      elem.setAttribute('placeholder', 'EMI Amount');
      break;
    case 'currentFace':
      elem.setAttribute(
        'placeholder',
        'enter value approximated to nearest 100'
      );
      break;
    default:
      break;
  }
});
