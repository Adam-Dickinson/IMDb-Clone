const apiBaseUrl = "https://api.themoviedb.org/3";
const apiKey = "f4d70b0e5a01316a460762659aba6bc2"
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");

async function fetchMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;
    displayMovies(movies);
    console.log(movies);
}

async function searchMovies(query) {
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query="${query}"`);
    const jsonResponse = await response.json();
    const movies = jsonResponse.results;

    displayMovies(movies);
}

function displayMovies(movies) {
    moviesGrid.innerHTML = movies
    .map(movie => `
    <div class="movie-card">
    <img src="${imageBaseUrl}${movie.poster_path}"/>
    <h1>${movie.title}</h1>
    <p>${movie.release_date}</p>
    </div>
    `).join("");
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    const searchQuery = searchInput.value;
    const movies = searchMovies(searchQuery);
    displayMovies(movies);
}

searchInput.addEventListener("submit",handleSearchFormSubmit);
fetchMoviesNowPlaying();



