import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

function MovieList({ movies }) {
  const location = useLocation();
  return (
    <div>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={css.link}
            >
              <MovieCard movie={movie} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
