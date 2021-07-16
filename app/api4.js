const formEl_4 = document.getElementById('mix_form');

formEl_4.addEventListener('submit', submitMixform);

async function submitMixform(e){
  e.preventDefault();
  
  const keyword = e.target.keyword_2.value;
  formEl_4.reset();
  const cardDiv = document.createElement('div');
  cardDiv.setAttribute('class', 'card');
  cardDiv.innerHTML = `
      <h5 class='card-title'>${keyword}</h5>
      <button id='search_gif_btn' class = 'btn btn-primary submit_btn'>Search ${keyword} Gifs</button>
      <button id='search_movie_btn' class = 'btn btn-primary submit_btn'>Search ${keyword} Movies</button>
    `;
  document.getElementById('card_container').appendChild(cardDiv);


  document.getElementById('search_gif_btn').addEventListener('click', clickSearchGifBtn)
  document.getElementById('search_movie_btn').addEventListener('click', clickSearchMovieBtn)
  
}

function clickSearchGifBtn(e){
  const keyword = e.target.parentElement.children[0].innerHTML;
  createGifCardList3(keyword);
}

function clickSearchMovieBtn(e){
  const keyword = e.target.parentElement.children[0].innerHTML;
  createMovieCardList2(keyword);
}

async function createGifCardList3(keyword){

  const target = document.getElementById('mix_container');
  target.innerHTML = '';

  const config = {
    method: 'get',
    url:`https://api.giphy.com/v1/gifs/search?api_key=IXoVmB8nPNAomnOn7ObnlNYJ33VnO6G6&q=${keyword}&limit=12`
  }
  const {data}= await axios(config);

  for (let el of data.data){
    const url = el.images.downsized_medium.url;
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');
    cardDiv.innerHTML = `
      <img class = 'card-img-top' src=${url}>
    `;
    target.appendChild(cardDiv);
  }
}

async function createMovieCardList2(keyword){
  console.log('keyword is', keyword)
  const target = document.getElementById('mix_container');
  target.innerHTML = '';

  const config = {
    method: 'get',
    url:`http://www.omdbapi.com/?apikey=dee44ef5&s=${keyword}`
  }
  const {data}= await axios(config);
  console.log('data is', data)

  for (let el of data.Search){
    const url = el.Poster;
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');
    cardDiv.innerHTML = `
      <img class = 'card-img-top' src=${url}>
      <div class="card-body">
        <h5 class="card-title">${el.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${el.Year}</h6>
      </div>
    `;
    target.appendChild(cardDiv);
  }

}

const clearMixBtn = document.getElementById('clearMix');
clearMixBtn.addEventListener('click', ()=>{
  document.getElementById('mix_container').innerHTML = '';
  document.getElementById('card_container').innerHTML = '';

})