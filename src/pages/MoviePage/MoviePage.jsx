import React, { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";
import css from "./MoviesPage.module.css";

function MoviesPage({ onSearch, searchedMovies }) {
  const [query, setQuery] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const notify = () => toast.error("This field must be completed");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      notify();
      return;
    }
    if (query.trim()) {
      onSearch(query);
      setIsSearched(true);
    }
  };

  return (
    <>
      <Navigation />
      <div className={css.searchForm}>
        <h2 className={css.title}>Search Movies</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie title"
          />
          <button type="submit">Search</button>
        </form>
        <div className={css.moviesContainer}>
          {isSearched && searchedMovies.length === 0 ? (
            <p className={css.nofound}>No movies found</p>
          ) : (
            searchedMovies.length > 0 && <MovieList movies={searchedMovies} />
          )}
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </>
  );
}

export default MoviesPage;
