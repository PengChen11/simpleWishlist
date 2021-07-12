const formEl_2 = document.getElementById('gif_details_form_2');

formEl_2.addEventListener('submit', submitGIFform2);

async function submitGIFform2(e){
  e.preventDefault();
  
  const keyword = e.target.keyword.value;
  
  const newBtn = document.createElement('button');
  newBtn.setAttribute('class', 'btn btn-primary submit_btn')
  newBtn.innerHTML = keyword;
  newBtn.addEventListener('click', clickKeywordBtn)
  formEl_2.appendChild(newBtn);
  
  formEl_2.reset();
}

function clickKeywordBtn(e){
  console.log(e)
  const keyword = e.target.innerText;
  console.log('keyword is: ', keyword)
  createGifCardList2(keyword);
}

async function createGifCardList2(keyword){

  const target = document.getElementById('gif_container_2');
  target.innerHTML = '';

  const config = {
    method: 'get',
    url:`https://api.giphy.com/v1/gifs/search?api_key=IXoVmB8nPNAomnOn7ObnlNYJ33VnO6G6&q=${keyword}&limit=20`
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

const clearBtn_2 = document.getElementById('clearGIF_2');
clearBtn_2.addEventListener('click', ()=>{
  const target = document.getElementById('gif_container_2');
  target.innerHTML = '';
})