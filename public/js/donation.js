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
      // otherwise, display the error
    } else {
      alert('Failed to make a donation');
    }
  }
}

  document.querySelector('.donate-form-group').addEventListener('submit', donationFormHandler);