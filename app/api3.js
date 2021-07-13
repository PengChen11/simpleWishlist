const movieAPIKey = 'dee44ef5';

const movieFormEl = document.getElementById('movie_details_form');

movieFormEl.addEventListener('submit', submitMovieForm);

async function submitMovieForm(e){
  e.preventDefault();
  
  const keyword = e.target.movie_keyword.value;
  
  createMovieCardList(keyword);
  movieFormEl.reset();
}

async function createMovieCardList(keyword){

  const target = document.getElementById('movie_container_1');
  target.innerHTML = '';

  const config = {
    method: 'get',
    url:`http://www.omdbapi.com/?apikey=${movieAPIKey}&s=${keyword}`
  }
  const {data}= await axios(config);

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

const clearMoviesBtn = document.getElementById('clearMovies');
clearMoviesBtn.addEventListener('click', ()=>{
  const target = document.getElementById('movie_container_1');
  target.innerHTML = '';
})
