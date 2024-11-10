import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";
const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGQyYzBjZTkwOTk5NGYzN2FmMTg0MDc4ZGJmN2Y0NiIsIm5iZiI6MTczMTIzNjU4MS4zMzI5NjY4LCJzdWIiOiI2NzMwOTAzMDNjMTA0ZDg4YmRjNWJlMTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.asS7LAQWLfarjXqcvVXbmLudUgbm-GGWVZmtE-qMmuw",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [movieId]);
  return (
    <div className={styles.reviewsContainer}>
      {reviews.length > 0 ? (
        <ul className={styles.reviewsList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={styles.reviewItem}>
              <h4>Review by {author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};
export default MovieReviews;
