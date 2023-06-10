const API_KEY='api_key=903cf5025f5e7508989fcb3993fd878f'
const BASE_URL='https://api.themoviedb.org/3';
const API_URL=BASE_URL+ '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const main=document.getElementById('main');
const form = document.getElementById('form');
const search=document.getElementById('search');
const searchURL =BASE_URL+'/search/movie?'+API_KEY;
getMovies(API_URL);

function getMovies(url){

    fetch(url).then(res=>res.json()).then(data =>{
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data){
    
    main.innerHTML='';

    data.forEach(movie =>{
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl =document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
        <img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="movie-title">
            <h3>${title}</h3>
            <span class="rating">${vote_average}</span>
        </div>
        <div class="movie-info">
            <h3 class="ov">Overview</h3>
            <span class="overview">
                ${overview}
            </span>
        </div>
        `
        main.appendChild(movieEl);
    })
}
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const searchTerm =search.value;
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }


})
