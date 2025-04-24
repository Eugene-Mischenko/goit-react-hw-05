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
      <Link to={`/movies/${movie.id}`} state={{ from: location.pathname }}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : defaults.poster
          }
          alt={movie.title || defaults.title}
        />
      </Link>
      <div>
        <Link
          to={`/movies/${movie.id}`}
          state={{ from: location }}
          className={css.movieCardTitle}
        >
          {movie.title || defaults.title}
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
