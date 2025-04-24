import {
  Link,
  NavLink,
  useParams,
  useLocation,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import MovieCast from "../../components/MovieCast/MovieCast";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";

  const defaults = {
    poster:
      "https://ih1.redbubble.net/image.1027712254.9762/fposter,small,wall_texture,product,750x1000.u2.jpg",
    title: "Title not found",
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDI1NzVlNTk2YjEzNmYyYzk4OGEzNjQ2M2UxNzRmZCIsIm5iZiI6MTcyOTUzNjc0MC42OTk1NzYsInN1YiI6IjY3MTQxNDg1ZDViNzkyNmU5NDZmZTA3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jTgPStEYZjh4MsA1qbeGgH5B6_sBxrINBI03wjPe7zo",
    },
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    }

    getData();
  }, [movieId]);

  if (isError) {
    return <p>Error: Failed to load movie details.</p>;
  }

  if (!movie.title && !isError) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navigation />
      <Link to={backLinkHref} className={css.goback}>
        Go back
      </Link>
      <div className={css.container}>
        <img
          className={css.image}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : defaults.poster
          }
          alt={movie.title || defaults.title}
        />
        <div className={css.info}>
          <h2 className={css.title}>{movie.title || defaults.title}</h2>
          <h3 className={css.subtitle}>User Score: {movie.vote_average}</h3>
          <h3 className={css.subtitle}>Overview</h3>
          <p className={css.description}>{movie.overview}</p>
          <h3 className={css.subtitle}>Genres</h3>
          <ul className={css.genresList}>
            {movie.genres?.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.additional}>
        <h3 className={css.subtitle}>Additional information</h3>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </>
  );
}

export default MovieDetailsPage;
