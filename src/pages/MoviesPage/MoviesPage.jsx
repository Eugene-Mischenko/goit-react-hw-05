import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";
import { searchMovies } from "../../api";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryFromUrl);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    if (queryFromUrl) {
      const fetchMovies = async () => {
        try {
          const results = await searchMovies(queryFromUrl);
          setSearchedMovies(results);
          setIsSearched(true);
        } catch (error) {
          console.error("Error searching movies:", error);
          toast.error("Failed to fetch movies");
        }
      };
      fetchMovies();
    }
  }, [queryFromUrl]);

  const notify = () => toast.error("This field must be completed");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      notify();
      return;
    }
    setSearchParams({ query: query.trim() });
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
