import { Routes, Route, NavLink } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import css from "./Navigation.module.css";

function Navigation() {
  return (
    <header>
      <nav className={css.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
        >
          Movies
        </NavLink>
      </nav>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes> */}
    </header>
  );
}

export default Navigation;
