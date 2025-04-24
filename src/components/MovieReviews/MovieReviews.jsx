import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
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
          throw new Error("Failed to fetch review details");
        }

        const data = await response.json();
        setReviews(data.results);
        console.log(reviews);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No reviews found for this movie.</p>;
  }

  return (
    <div>
      <ul className={css.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id} className={css.reviewsListItem}>
            <p className={css.author}>Author: {review.author}</p>
            <p className={css.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
