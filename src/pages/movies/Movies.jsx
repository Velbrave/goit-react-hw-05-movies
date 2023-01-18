import Searchbar from 'components/earchBared/Searchbar';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPostMovie } from 'services/api-movies';
import PropTypes from 'prop-types';
import css from './Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFilms, setSearchFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const searchMovie = searchParams.get('query');
  const onSubmit = movie => {
    setSearchParams({ query: movie });
  };

  useEffect(() => {
    const fetchFilmsBySearchMovie = async searchMovie => {
      try {
        setIsLoading(true);
        const films = await getPostMovie(searchMovie);
        if (films.length === 0) {
          toast.error(`Nothing found for request: ${searchMovie}`);
          return;
        }
        setSearchFilms(films);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (searchMovie === null) return;
    fetchFilmsBySearchMovie(searchMovie);
  }, [searchMovie]);

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      <div>
        {isLoading === true && <p>Loading...</p>}
        {error?.lenght > 0 && <p>Oops,something went wrong...</p>}
        {Array.isArray(searchFilms) &&
          searchFilms.map(film => {
            return (
              film.title && (
                <Link
                  key={film.id}
                  className={css.Link}
                  to={`/movies/${film.id}`}
                  state={{ from: location }}
                >
                  <ul>
                    <li>{film.title}</li>
                  </ul>
                </Link>
              )
            );
          })}
      </div>
    </div>
  );
};

Movies.propTypes = {
  onSubmit: PropTypes.func,
  searchFilms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
};

export default Movies;
