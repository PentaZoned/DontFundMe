// New Post Form Handler
async function newFormHandler(event) {
    event.preventDefault();

    // Get the project title and project text from the form

    const title = document.querySelector('#project-title').value.trim();
    const fund_needed = document.querySelector('#fund_needed').value.trim();   
    const description = document.querySelector('#project-desc').value.trim();

 
    if (title && fund_needed && description){
      const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        fund_needed,
        description
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
      alert('Failed to create project');
    }
  }
}
  
  document.querySelector('.new-project-form').addEventListener('submit', newFormHandler);