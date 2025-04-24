import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";

function MovieList({ movies }) {
  return (
    <div>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
