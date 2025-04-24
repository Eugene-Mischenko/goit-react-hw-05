import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notFoundContainer}>
      <h1 className={css.errorTitle}>404</h1>
      <p className={css.errorMessage}>
        Oops! Looks like this page got lost in the multiverse.
      </p>
      <Link to="/" className={css.backHomeButton}>
        Go Back Home
      </Link>

      <div className={css.deadpoolSection}>
        <img
          src="https://www.iphones.ru/wp-content/uploads/2016/02/main_deadpool.jpg"
          alt="Deadpool"
          className={css.deadpoolImage}
        />
        <p className={css.deadpoolQuote}>
          "Oh no, not another lost one... Better call Spider-Man! Or, you know,
          just go home."
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
