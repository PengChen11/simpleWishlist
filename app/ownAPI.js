const myAPI = 'https://simple-wishlist-svr.herokuapp.com';
// const myAPI = 'http://localhost:3000';

const inputForm = document.getElementById('destination_details_form');

inputForm.addEventListener('submit', submitForm);

loadCards();


async function loadCards(){

  document.getElementById('destinations_container').innerHTML = '';

  const config = {
    method: 'get',
    url: `${myAPI}/destinations`
  }

  const {data} = await axios(config);

  console.log('data', data)

  const target = document.getElementById('destinations_container')

  for (let id in data) {
    const card = createDestinationCard(id, data[id].name, data[id].location, data[id].photo, data[id].description);
    target.appendChild(card);
  }
}



async function submitForm(e) {
  e.preventDefault(); 

  const name = e.target.elements['destination'].value;
  const location = e.target.elements['location'].value;
  const photo = e.target.elements['URL'].value;
  const description = e.target.elements['description'].value;
  
  const config = {
    method: 'post',
    url: `${myAPI}/destinations`,
    data: {
      name,
      location,
      photo,
      description
    }
  }

  await axios(config);

  loadCards();

  inputForm.reset();
}



function createDestinationCard(id, destination, location, photoUrl, description) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.setAttribute('id', id);

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


async function removeDestination(event) {

  const cardID = event.target.parentElement.parentElement.parentElement.id;

  const config = {
    method: 'delete',
    url: `${myAPI}/destinations`,
    params: {
      _id: cardID
    } 
  }
  await axios(config);
  loadCards();
}


