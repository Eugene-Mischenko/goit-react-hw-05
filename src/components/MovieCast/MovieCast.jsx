import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [credits, setCredits] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDI1NzVlNTk2YjEzNmYyYzk4OGEzNjQ2M2UxNzRmZCIsIm5iZiI6MTcyOTUzNjc0MC42OTk1NzYsInN1YiI6IjY3MTQxNDg1ZDViNzkyNmU5NDZmZTA3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jTgPStEYZjh4MsA1qbeGgH5B6_sBxrINBI03wjPe7zo",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cast details");
        }

        const data = await response.json();
        setCredits(data.cast);
        console.log(credits);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    }

    fetchCast();
  }, [movieId]);

  if (isError) {
    return <p>Failed to load cast information.</p>;
  }

  if (credits.length === 0) {
    return <p>Loading cast...</p>;
  }

  return (
    <div>
      <ul className={css.creditsList}>
        {credits.map((cast) => (
          <li key={cast.id} className={css.creditsListItem}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                alt={cast.name}
              />
            </div>
            <p className={css.name}>{cast.name}</p>
            <p className={css.character}>Character: {cast.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
