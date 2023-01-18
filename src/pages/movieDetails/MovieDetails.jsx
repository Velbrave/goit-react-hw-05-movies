import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import pexels from '../../image/pexels.jpg';
import PropTypes from 'prop-types';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getPostDetails } from 'services/api-moviesDetails';
import css from '../movieDetails/MovieDetails.module.css';

const MovieDetails = () => {
  const [filmsDetails, setFilmsDetails] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const filmsDetails = async movieId => {
      try {
        setIsLoading(true);
        const film = await getPostDetails(movieId);
        setFilmsDetails(film);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    filmsDetails(movieId);
  }, [movieId]);

  return (
    <div>
      <Link to={location?.state?.from ?? '/'}>
        <button className={css.Button} type="button">
          Go back
        </button>
      </Link>
      {isLoading === true && <p>Loading...</p>}
      {error?.length > 0 && <p>Oops,something went wrong...</p>}
      {filmsDetails !== null && (
        <div className={css.FilmDetails}>
          <div>
            <img
              className={css.Image}
              src={
                filmsDetails.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${filmsDetails.backdrop_path}`
                  : pexels
              }
              alt={filmsDetails.name}
            />
          </div>
          <div className={css.Container}>
            <h2>{filmsDetails.title}</h2>
            <p>
              User score: {Math.round(`${filmsDetails.vote_average * 10}`)}%
            </p>
            <p className={css.Overview}>
              <b className={css.Title}>Overview</b> {filmsDetails.overview}
            </p>
            <p className={css.Genres}>
              <b>Genres</b>
            </p>
            <div className={css.Name}>
              {filmsDetails.genres.map(detal => {
                return <p key={detal.id}>{detal.name}</p>;
              })}
            </div>
          </div>
        </div>
      )}
      <div className={css.Inform}>
        <p className={css.AddInform}>Additional information</p>
        <ul>
          <li>
            <Link
              to="cast"
              state={{ from: location?.state?.from }}
              className={css.Link}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              state={{ from: location?.state?.from }}
              className={css.Link}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

MovieDetails.propTypes = {
  filmsDetails: PropTypes.shape({
    backdrop_path: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    popularity: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
};

export default MovieDetails;
