const MY_API_KEY = "ok26NQiiNWkASRMFGafrZrTRZ3FNxo94"
const RATING = "g"
const LIMIT = 9
const BASE_URL = `http://api.giphy.com/v1/gifs/search?api_key=${MY_API_KEY}&limit=${LIMIT}&rating=${RATING}&q=`
var SEARCH_URL = BASE_URL
var PAGES = 0
//http://api.giphy.com/v1/gifs/search?api_key=ok26NQiiNWkASRMFGafrZrTRZ3FNxo94&q=puppy

const  searchButtonEl = document.getElementById("search-button")
const  searchInputEl = document.getElementById("search-input")
const  gifsGridEl = document.getElementById("gifs-grid")
var showButton = document.getElementById("show-more-btn")

function renderGif(gif){
    const img_url = gif.images.fixed_height.url
    gifsGridEl.innerHTML = gifsGridEl.innerHTML + `
    <div class="gif-card">
        <img class="gif-photo" src="${img_url}" alt="image"/>
    </div>
    `
}

function renderGifs(gifs){
    for(var i = 0; i < gifs.length; i++){
        renderGif(gifs[i])
    }
}

async function getResults(URL){
    SEARCH_URL = URL

    const response = await fetch(URL)

    const results = await response.json()
    renderGifs(results.data)
}

document.getElementById("search-form").addEventListener('submit', (event) => {
    event.preventDefault()
    getResults(BASE_URL + searchInputEl.value)
    showButton.classList.remove("hidden")
})

//load more movies
function loadMoreResults(){
    PAGES += 1;
    var offset = PAGES * LIMIT
    getResults(SEARCH_URL + `&offset=${offset}`)
    movies.forEach(listMovie)
}

//load more movies if button is clicked
showButton.addEventListener('click', loadMoreResults)