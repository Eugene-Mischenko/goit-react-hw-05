import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../api"; // Імпортуємо функцію для запиту

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchTrendingMovies()
      .then((data) => {
        if (isMounted) {
          setMovies(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch trending movies");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navigation />
      <h1 className={css.title}>Trending today</h1>
      {error ? (
        <p className={css.error}>{error}</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </>
  );
}

export default HomePage;
