import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as moviesAPI from '../../api';
import { List, Item, Image, Name, Character } from '../Cast/Cast.styled';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    setStatus('pending');

    async function getCast() {
      try {
        const { cast } = await moviesAPI.getCastById(movieId);

        setCast(cast);
        setStatus('resolved');
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }

    getCast();
  }, [movieId]);

  return (
    <>
      {status === 'rejected' && <h3>{error}</h3>}
      <List>
        {status === 'resolved' &&
          cast.map(({ name, profile_path, id, character }) => (
            <Item key={id}>
              {profile_path !== null && (
                <Image
                  src={`http://image.tmdb.org/t/p/w780/${profile_path}`}
                  alt="foto"
                />
              )}
              <Name>{name}</Name>
              <Character>Character: {character}</Character>
            </Item>
          ))}
      </List>
    </>
  );
};

Cast.propTypes = {
  cast: PropTypes.array,
  error: PropTypes.any,
  status: PropTypes.string,
};

export default Cast;
