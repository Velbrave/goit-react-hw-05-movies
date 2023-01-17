import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPost } from 'services/api-home';
import PropTypes from 'prop-types';
import css from './Home.module.css';

const Home = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchFilms = async () => {
      try {
        setIsLoading(true);
        const films = await getPost();
        setFilms(films);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    searchFilms();
  }, []);

  return (
    <div>
      {isLoading === true && <p>Loading...</p>}
      {error?.length > 0 && <p>Oops,something went wrong...</p>}
      <h1 className={css.Title}>Trending today</h1>
      {Array.isArray(films) &&
        films.map(film => {
          return (
            film.title && (
              <Link
                key={film.id}
                className={css.Link}
                to={`/movies/${film.id}`}
              >
                <ul>
                  <li>{film.title}</li>
                </ul>
              </Link>
            )
          );
        })}
    </div>
  );
};

Home.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
};

export default Home;
