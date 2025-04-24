import { Link, useLocation } from "react-router-dom";
import css from "./MovieCard.module.css";

const defaults = {
  poster:
    "https://ih1.redbubble.net/image.1027712254.9762/fposter,small,wall_texture,product,750x1000.u2.jpg",
  title: "Title not found",
};

function MovieCard({ movie }) {
  const location = useLocation();

  return (
    <div className={css.movieCard}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : defaults.poster
        }
        alt={movie.title || defaults.title}
      />
      <p className={css.movieCardTitle}>{movie.title || defaults.title}</p>
    </div>
  );
}

export default MovieCard;
