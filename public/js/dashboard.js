async function createHandler(event) {
  event.preventDefault();
    document.location.replace('/projects/create');
};

async function allProjectHandler(event) {
  event.preventDefault();
    document.location.replace('/projects/');
};

document.querySelector('.create').addEventListener('click', createHandler);
