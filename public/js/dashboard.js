async function createHandler(event) {
  event.preventDefault();
      console.log("button works");
        document.location.replace('/projects/create');
};

document.querySelector('.create').addEventListener('click', createHandler);