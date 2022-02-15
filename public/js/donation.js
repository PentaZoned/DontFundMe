// New Post Form Handler
async function donationFormHandler(event) {
    event.preventDefault();

    // Get the project is and donation from the form
    
    const amount = document.querySelector('#donation-amount').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

 
    if (amount > 0){

      const response = await fetch(`/api/donations`, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        project_id: id
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
      donation_total();
      // otherwise, display the error
    } else {
      alert('Failed to make a donation');
    }
  }
}

//Get an array of donation amounts
function getAmountArr(){
    const amountArr = [];
    db.query(`SELECT * FROM donation WHERE project_id=${id}`,  (err, res) => {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        amountArr.push(res[i].amount);
      }
  
    })
    return amountArr;
  }

  //Get the donation total
function donation_total(){
let donation_total;
let amountArr;
      for (var i = 0; i < amountArr.length; i++) {
          donation_total += amountArr[i];
          return donation_total;
      };
}
  document.querySelector('.donate-form-group').addEventListener('submit', donationFormHandler);