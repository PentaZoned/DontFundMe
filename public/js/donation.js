// New Post Form Handler
async function donationFormHandler(event) {
    event.preventDefault();

    // Get the project title and project text from the form
    
    const amount = document.querySelector('#donation-amount').value.trim();

 
    if (amount > 0){

      const response = await fetch(`/api/donations`, {
      method: 'POST',
      body: JSON.stringify({
        amount
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // if the response is okay, reload the page, showing the dashboard
    if (response.ok) {
      console.log(response);
      document.location.replace('/dashboard');
      getAmountArr();
      donationTotal();
      // otherwise, display the error
    } else {
      alert('Failed to make a donation');
    }
  }
}

//Get an array of donation amounts
function getAmountArr(){
    var projectId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1];
    var amountArr = [];
    var query = `SELECT * FROM donation WHERE project_id=${projectId}`;
    db.query(query,  (err, res) => {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        roleArr.push(res[i].amount);
      }
  
    })
    return amountArr;
  }

  //Get the donation total
function donationTotal(){
let donationTotal = 0;
let amountArr;
      for (var i = 0; i < amountArr.length; i++) {
          donationTotal += amountArr[i];
          return donationTotal;
      };
}
  document.querySelector('.donate-form-group').addEventListener('submit', donationFormHandler);