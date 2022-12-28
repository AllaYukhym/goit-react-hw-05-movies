import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as moviesAPI from '../../api';
import { Form, Input, Button, List, Item } from './Movies.styled';

const Movies = () => {
  const [titles, setTitles] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (query === '') {
      return;
    }

    setStatus('pending');

    async function getMovies() {
      try {
        const { results } = await moviesAPI.getMoviesByQuery(query);

        setTitles([...results]);
        setStatus('resolved');
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }

    getMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
    setTitles([]);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="query" />
        <Button type="submit">Search</Button>
      </Form>
      {status === 'rejected' && <h3>{error}</h3>}
      <List>
        {status === 'resolved' &&
          titles.map(({ id, title }) => (
            <Item key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </Item>
          ))}
      </List>
    </>
  );
};

Movies.propTypes = {
  titles: PropTypes.array,
  error: PropTypes.any,
  status: PropTypes.string,
  searchParams: PropTypes.object,
};

export default Movies;
