import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../../api';
import { Title, List, Item } from './Home.styled';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    setStatus('pending');

    async function getMovies() {
      try {
        const { results } = await movieAPI.getMovie();

        setMovies([...results]);
        setStatus('resolved');
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }

    getMovies();
  }, []);

  return (
    <>
      {status === 'rejected' && <h3>{error}</h3>}
      <Title>Trending today</Title>
      <List>
        {status === 'resolved' &&
          movies.map(({ title, id }) => (
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

Home.propTypes = {
  movies: PropTypes.array,
  error: PropTypes.any,
  status: PropTypes.string,
};

export default Home;
