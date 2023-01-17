import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostCredits } from 'services/api-cast';
import garcia from '../../image/pexels.jpg';
import PropTypes from 'prop-types';
import css from './Cast.module.css';

const Cast = () => {
  const [castCredits, setCastCredits] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const filmsCredits = async movieId => {
      try {
        setIsLoading(true);
        const cast = await getPostCredits(movieId);
        setCastCredits(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    filmsCredits(movieId);
  }, [movieId]);

  return (
    <div>
      {isLoading === true && <p>Loading...</p>}
      {error?.length > 0 && <p>Oops,something went wrong...</p>}
      {Array.isArray(castCredits) &&
        castCredits.map(({ id, name, profile_path, character }) => {
          return (
            <div key={id}>
              <img
                className={css.Image}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                    : garcia
                }
                alt={name}
              />
              <p className={css.Name}>{name}</p>
              <p className={css.Character}>Character: {character}</p>
            </div>
          );
        })}
    </div>
  );
};

Cast.propTypes = {
  castCredits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      profile_path: PropTypes.string,
      character: PropTypes.string,
    })
  ),
};

export default Cast;
