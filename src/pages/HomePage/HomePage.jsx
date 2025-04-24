import Navigation from "../../components/Navigation/Navigation";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
function HomePage({ movies }) {
  return (
    <>
      <Navigation />
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
}

export default HomePage;
