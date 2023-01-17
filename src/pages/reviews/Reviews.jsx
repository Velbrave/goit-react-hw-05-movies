import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostReviews } from 'services/api-reviews';
import PropTypes from 'prop-types';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviewsFilms, setReviewsFilms] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const filmsReviews = async movieId => {
      try {
        setIsLoading(true);
        const cast = await getPostReviews(movieId);
        setReviewsFilms(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    filmsReviews(movieId);
  }, [movieId]);

  return (
    <div>
      {isLoading === true && <p>Loading...</p>}
      {error?.length > 0 && <p>Oops,something went wrong...</p>}
      {reviewsFilms.length !== 0 ? (
        reviewsFilms.map(({ id, author, content }) => {
          return (
            <div className={css.Reviews} key={id}>
              <p className={css.Autor}>Author: {author}</p>
              <p>{content}</p>
            </div>
          );
        })
      ) : (
        <p>We dont have any reviews for this movie</p>
      )}
    </div>
  );
};

Reviews.propTypes = {
  reviewsFilms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      author: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

export default Reviews;
