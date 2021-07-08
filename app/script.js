
const inputForm = document.getElementById('destination_details_form');
inputForm.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault(); 

  const destination = e.target.elements['destination'].value;
  const location = e.target.elements['location'].value;
  const photoURL = e.target.elements['photo'].value;
  const desc = e.target.elements['description'].value;
  console.log(e.target.elements)
  
  const destinationCard = createDestinationCard(
    destination,
    location,
    photoURL,
    desc
  );

  const wishListContainer = document.getElementById('destinations_container');

  document.getElementById('title').innerHTML = 'My WishList';

  wishListContainer.appendChild(destinationCard);
  inputForm.reset();
}


function createDestinationCard(destination, location, photoUrl, description) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const img = document.createElement('img');
  img.setAttribute('class', 'card-img-top');
  img.setAttribute('alt', destination);

  const defaultURL = 'https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg';
  if (!photoUrl) {
    img.setAttribute('src', defaultURL);
  } else {
    img.setAttribute('src', photoUrl);
  }

  card.appendChild(img);

  const cardBody = document.createElement('div');
  cardBody.setAttribute('class', 'card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.setAttribute('class', 'card-title');
  cardTitle.innerText = destination;
  cardBody.appendChild(cardTitle);

  const cardSubtitle = document.createElement('h6');
  cardSubtitle.setAttribute('class', 'card-subtitle mb-2 text-muted');
  cardSubtitle.innerText = location;
  cardBody.appendChild(cardSubtitle);

  if (description) {
    const cardText = document.createElement('p');
    cardText.setAttribute('class', 'card-text');
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }

  const buttonsContainer = document.createElement('div');
  buttonsContainer.setAttribute('class', 'buttons_container');

  const cardEditBtn = document.createElement('button');
  cardEditBtn.setAttribute('class', 'btn btn-warning');
  cardEditBtn.innerText = 'Edit';
  cardEditBtn.addEventListener('click', editDestination);

  const cardDeleteBtn = document.createElement('button');
  cardDeleteBtn.setAttribute('class', 'btn btn-danger');
  cardDeleteBtn.innerText = 'Remove';
  cardDeleteBtn.addEventListener('click', removeDestination);

  buttonsContainer.appendChild(cardEditBtn);
  buttonsContainer.appendChild(cardDeleteBtn);

  cardBody.appendChild(buttonsContainer);

  card.appendChild(cardBody);

  return card;
}

function editDestination(event) {
  const cardBody = event.target.parentElement.parentElement;
  const title = cardBody.children[0];
  const subTitle = cardBody.children[1];

  const card = cardBody.parentElement;
  const photoUrl = card.children[0];

  const newTitle = window.prompt('Enter new name');
  const newSubtitle = window.prompt('Enter new location');
  const newPhotoUrl = window.prompt('Enter new photo url');

  if (newTitle) {
    title.innerText = newTitle;
  }

  if (newSubtitle) {
    subTitle.innerText = newSubtitle;
  }

  if (newPhotoUrl) {
    photoUrl.setAttribute('src', newPhotoUrl);
  }
}

function removeDestination(event) {

  const card = event.target.parentElement.parentElement.parentElement;
  card.remove();
  if (document.getElementById('destinations_container').children.length === 0){
    document.getElementById('title').innerHTML = 'Enter destination details';
  }
}
