import { useState } from 'react';
import css from '../searchBar/SearchBar.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [searchMovie, setSearchMovie] = useState('');

  const handleNameChange = event => {
    setSearchMovie(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchMovie.trim() === '') {
      toast.error('Fill in the search field');
      return;
    }

    onSubmit(searchMovie);
    setSearchMovie('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormBtn}>
          <span className={css.Label}>Search</span>
        </button>

        <input
          className={css.Input}
          type="text"
          name="searchMovie"
          placeholder="Search movies"
          value={searchMovie}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

Searchbar.protoTypes = {
  handleSubmit: PropTypes.func,
  searchMovie: PropTypes.string,
  handleNameChange: PropTypes.func,
};

export default Searchbar;
