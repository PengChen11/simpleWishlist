const gifAPIKey = 'IXoVmB8nPNAomnOn7ObnlNYJ33VnO6G6';

const formEl = document.getElementById('gif_details_form');

formEl.addEventListener('submit', submitGifForm);

async function submitGifForm(e){
  e.preventDefault();
  
  const keyword = e.target.keyword.value;
  
  createGifCardList(keyword);
  formEl.reset();
}

async function createGifCardList(keyword){

  const target = document.getElementById('gif_container_1');
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

const clearBtn = document.getElementById('clearGIF');
clearBtn.addEventListener('click', ()=>{
  const target = document.getElementById('gif_container_1');
  target.innerHTML = '';
})


