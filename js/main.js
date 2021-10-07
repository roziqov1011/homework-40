
var normalizeMovies = movies.map(function (movie, i){
    return{
        id: i+1,
        title: movie.Title.toString(),
        year: movie.movie_year,
        categories: movie.Categories.split("|").join(", "),
        summary: movie.summary,
        imdbId: movie.imdb_id,
        imdbReting: movie.imdb_rating,
        runtime: movie.runtime,
        language: movie.language,
        youtubeId: movie.ytid,
    }
});


var yarim = normalizeMovies.slice(0, 100);
console.log(yarim[0].title);



var elMovies = $_(".movies");
var elTemplate = $_("#movies-template").content;

elMovies.innerHTML = "";

var createMoviesElement = function (kino){
    var elNewMovie = elTemplate.cloneNode(true);

    // elNewMovie.querySelector(".movies__img").src ="https://www.youtube.com/embed/"+kino.youtubeId;
    elNewMovie.querySelector(".movies__title").textContent = kino.title;
    elNewMovie.querySelector(".movies__categories").textContent = kino.categories;
    elNewMovie.querySelector(".movies__id").href ="https://www.youtube.com/watch?v="+ kino.youtubeId;
    elNewMovie.querySelector(".movies__id").target = "_blank";
    return elNewMovie;
}

yarim.forEach(function (kino) {
    elMovies.appendChild(createMoviesElement(kino));
});





var elForm = $_(".js-form");
var elInputSearch = $_(".js-search");
var elResalut = $_(".resalut-wrap");
elResalutImg = $_(".resalut__img");
var elTitle = $_(".resalut-title");
var elCotegorie = $_(".resalut-cotegorie");
var elLink = $_(".resalut-link");

elResalut.style.display= "none";

elForm.addEventListener("submit", function (evt){
    evt.preventDefault();
    var natija = elInputSearch.value.trim();
    var searchResult = [];

    if(natija !==""){
        var searchQuery = new RegExp(`${natija}`, "gi");

        yarim.forEach(function (movie) {
            if(movie.title.match(searchQuery)){
                 searchResult.push(movie);
                 elResalut.style.display= "block";
                 elResalutImg.src ="https://www.youtube.com/embed/"+searchResult[0].youtubeId;
                 elTitle.textContent = searchResult[0].title;
                 elCotegorie.textContent = searchResult[0].categories;
                 elLink.href ="https://www.youtube.com/watch?v="+ searchResult[0].youtubeId;
                 elLink.textContent ="open youtube";
                 elMovies.style.display= "none";
            }
        });
        console.log(natija);
        console.log(searchResult);
        console.log(searchResult);
    }
    else if(natija =="")
    {
        elMovies.style.display= "inline";
        elResalut.style.display= "none";
    }


});



