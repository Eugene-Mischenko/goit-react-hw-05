import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./HomePage.module.css";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGQyYzBjZTkwOTk5NGYzN2FmMTg0MDc4ZGJmN2Y0NiIsIm5iZiI6MTczMTIzNjU4MS4zMzI5NjY4LCJzdWIiOiI2NzMwOTAzMDNjMTA0ZDg4YmRjNWJlMTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.asS7LAQWLfarjXqcvVXbmLudUgbm-GGWVZmtE-qMmuw",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchTrendingMovies();
  }, []);
  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};
export default HomePage
