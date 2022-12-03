const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const search = document.getElementById("search");
const searchForm = document.getElementById("search-form");

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  if (respData.results.length>0) {
    showMovies(respData.results);
  } else {
    alert("no such movie found")
  }

  // return respData;
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
    
    <img src="${loadImg(poster_path)}" alt="${title}">

    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h1>Overview:</h1>
      ${overview}  
    </div>
    `;
    main.appendChild(movieEl);
  });
}

function loadImg(poster_path) {
  if (poster_path != null) {
    return IMGPATH + poster_path;
    // <img src="${IMGPATH + poster_path}" alt="${title}"></img>
  } else {
    return "img.png"
  }
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

getMovies(APIURL);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    console.log(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
