// New Post Form Handler
async function newFormHandler(event) {
    event.preventDefault();

    // Get the project title and project text from the form
    const title = document.querySelector("#project-title").value.trim();
    const description = document.querySelector("#project-desc").value.trim();
    const fund_needed = document.querySelector("#project-funding").value.trim();   


 
    if (title && description && fund_needed){
      const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        fund_needed
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // if the response is okay, reload the page, showing the newest project now in the user's project list
    if (response.ok) {
      document.location.replace('/dashboard');
      // otherwise, display the error
    } else {
      alert(response.statusText);
    }
  }
}
  
  document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);