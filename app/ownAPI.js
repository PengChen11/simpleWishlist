const myAPI = 'https://simple-wishlist-svr.herokuapp.com';
// const myAPI = 'http://localhost:3000';

const inputForm = document.getElementById('destination_details_form');

inputForm.addEventListener('submit', submitForm);

loadCards();

let destinationCollection;


async function loadCards(){

  document.getElementById('destinations_container').innerHTML = '';

  const config = {
    method: 'get',
    url: `${myAPI}/destinations`
  }

  const {data} = await axios(config);
  destinationCollection = data; // for edit future use

  console.log('data', data)

  const target = document.getElementById('destinations_container')

  for (let id in data) {
    const card = createDestinationCard(id, data[id].name, data[id].location, data[id].photo, data[id].description);
    target.appendChild(card);
  }
}



async function submitForm(e) {
  console.log(e);
  
  e.preventDefault(); 
  console.log(e.submitter.id);

  const _id = e.target.elements['_id'].value;
  const name = e.target.elements['destination'].value;
  const location = e.target.elements['location'].value;
  const photo = e.target.elements['URL'].value;
  const description = e.target.elements['description'].value;
  
  const postConfig = {
    method: 'post',
    url: `${myAPI}/destinations`,
    data: {
      name,
      location,
      photo,
      description
    }
  }

  const putConfig = {
    method: 'put',
    url: `${myAPI}/destinations`,
    data: {
      name,
      location,
      photo,
      description
    },
    params:{
      _id
    }
  }

  if (e.submitter.id === 'createBtn'){
    await axios(postConfig);
  } else if (e.submitter.id === 'editBtn'){
    await axios(putConfig);
    document.getElementById('editBtn').classList.add('d-none');
    document.getElementById('createBtn').classList.remove('d-none');
  }

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

async function editDestination (e){
  document.getElementById('editBtn').classList.remove('d-none');

  document.getElementById('createBtn').classList.add('d-none');

  const id = e.target.parentElement.parentElement.parentElement.id;
  console.log('id', id)
  const dest = destinationCollection[id];
  document.getElementById('_id').value = dest._id;
  document.getElementById('destination').value = dest.name;
  document.getElementById('location').value = dest.location;
  document.getElementById('URL').value = dest.photo;
  document.getElementById('description').value = dest.description;


}


