import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCast from "../MovieCast/MovieCast.jsx";
import Web from "../Web/Web.jsx";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [error, setError] = useState(null);

  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGQyYzBjZTkwOTk5NGYzN2FmMTg0MDc4ZGJmN2Y0NiIsIm5iZiI6MTczMTIzNTg4OC42NzUsInN1YiI6IjY3MzA5MDMwM2MxMDRkODhiZGM1YmUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30Shi7wDExdPZoBNRbjNL8i_hhgDb-i5w8Vpf6FGhC8";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    let isMounted = true;
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setMovies(data.results);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch movies");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = (query) => {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US`;

    fetch(searchUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setSearchedMovies(data.results);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to search");
      });
  };
  return (
    <>
      <Web />
      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route
          path="/movies"
          element={
            <MoviesPage
              onSearch={handleSearch}
              searchedMovies={searchedMovies}
            />
          }
        />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
