const API_KEY = "YOUR_OMDB_API_KEY"; // 🔑 Get it free from http://www.omdbapi.com/apikey.aspx
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesDiv = document.getElementById("movies");

// Search button click
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    } else {
        moviesDiv.innerHTML = "<p>Please enter a movie name.</p>";
    }
});

// Fetch movies from OMDb API
async function fetchMovies(query) {
    moviesDiv.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const data = await res.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            moviesDiv.innerHTML = `<p>${data.Error}</p>`;
        }
    } catch (err) {
        moviesDiv.innerHTML = "<p>⚠️ Error fetching data. Please try again later.</p>";
    }
}

// Display movies in grid
function displayMovies(movies) {
    moviesDiv.innerHTML = "";
    movies.forEach((movie) => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x270?text=No+Image"}" alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>📅 ${movie.Year}</p>
      </div>
    `;
        moviesDiv.appendChild(card);
    });
}