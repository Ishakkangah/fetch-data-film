const btn = document.getElementById("button");
const search = document.querySelector(".search");

btn.addEventListener("click", async function () {
  const keyword = search.value;
  const movies = await getMovie(keyword);
  updateUi(movies);
}) 


// get data
async function getData(){
    const keyword = 'avatar';
    const movies = await getMovie(keyword);
    updateUi(movies);
}

getData();

function getMovie(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=cd7d1b88&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUi(movies) {
  let cards = "";
  movies.forEach((movie) => {
    cards += showCards(movie);
  });
  document.querySelector(".getMovies").innerHTML = cards;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("movieID")) {
    const imdbid = e.target.dataset.imdbid;
    const m = await getMovieDetail(imdbid);
    updateDetailID(m);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=cd7d1b88&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateDetailID(m) {
  const card = movieDetail(m);
  document.querySelector(".modal-body").innerHTML = card;
}

function showCards(movie) {
  return ` <div class="imageCards" >
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}" />
                <div class="card-body text-center">
                    <a href="#" class="btn btn-primary movieID" data-toggle="modal" data-target="#modalCard" data-imdbid="${movie.imdbID}">Show Details</a>
                    <h5 class="card-title mt-2">${movie.Title} (${movie.Year})</h5>
                </div>
            </div > `;
}

function movieDetail(m) {
  return `  <div div class="row justify-content-center" >
                <div class="col-md">
                    <div class="card" style="width: 18rem">
                    <img src="${m.Poster}" class="card-img-top" />
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="card">
                    <ul class="list-group list-group-flush text-dark">
                        <li class="list-group-item"><h2>${m.Title}. (${m.Year})</h2></li>
                        <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
                        <li class="list-group-item"><strong>Realise : </strong>${m.Released}</li>
                        <li class="list-group-item"><strong>Runtime : </strong>${m.Runtime}</li>
                        <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                        <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                        <li class="list-group-item"><strong>Awards : </strong>${m.Awards}</li>
                        <li class="list-group-item"><strong>Country : </strong>${m.Country}</li>
                        <li class="list-group-item"><strong>Language : </strong>${m.Language}</li>
                        <li class="list-group-item"><strong>Type : </strong>${m.Type}</li>
                    </ul>
                    <div class="card-footer">Card footer</div>
                    </div>
                </div>
            </div > `;
}
