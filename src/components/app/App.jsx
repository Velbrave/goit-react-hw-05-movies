import { lazy, Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import css from '../app/App.module.css';

const Movies = lazy(() => import('../../pages/movies/Movies'));
const MovieDetails = lazy(() =>
  import('../../pages/movieDetails/MovieDetails')
);
const Cast = lazy(() => import('../../pages/cast/Cast'));
const Home = lazy(() => import('../../pages/home/Home'));
const Reviews = lazy(() => import('../../pages/reviews/Reviews'));
const PageNotFound404 = lazy(() =>
  import('../../pages/pageNotFound/PageNotFound404')
);

const App = () => {
  return (
    <div>
      <header className={css.Header}>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? css.LinkActive : css.Navlink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? css.LinkActive : css.Navlink
            }
          >
            {' '}
            Movies
          </NavLink>
        </nav>
      </header>
      <div>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId/*" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<PageNotFound404 />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
