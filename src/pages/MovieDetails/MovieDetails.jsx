import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, Suspense } from 'react';
import PropTypes from 'prop-types';
import * as moviesAPI from '../../api';
import {
  Button,
  Image,
  Container,
  ImageHolder,
  InfoHolder,
  Title,
  Score,
  Overview,
  Text,
  Genres,
  AddInfo,
  List,
  Item,
  ListGenres,
  ItemGenre,
} from './MovieDetails.styled';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [poster, setPoster] = useState('');

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    setStatus('pending');

    async function getMovies() {
      try {
        const result = await moviesAPI.getMovieById(movieId);

        setMovie(result);
        setStatus('resolved');
        if (result.poster_path !== null) {
          setPoster(`http://image.tmdb.org/t/p/w780/${result.poster_path}`);
        }
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
      {status === 'resolved' && (
        <>
          <Button to={backLinkHref.current}>Go back</Button>
          <Container>
            <ImageHolder>
              <Image src={`${poster}`} alt="poster" />
            </ImageHolder>
            <InfoHolder>
              <Title>{movie.title}</Title>
              <Score>Use Score: {movie.vote_average}</Score>
              <Overview>Overview</Overview>
              <Text>{movie.overview}</Text>
              <Genres>Genres</Genres>
              <ListGenres>
                {movie.genres.map(({ id, name }) => (
                  <ItemGenre key={id}>{name}</ItemGenre>
                ))}
              </ListGenres>
            </InfoHolder>
          </Container>
          <AddInfo>Additional information</AddInfo>
          <List>
            <Item>
              <Link to="cast">Cast</Link>
            </Item>
            <Item>
              <Link to="reviews">Reviews</Link>
            </Item>
          </List>
        </>
      )}
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

MovieDetails.propTypes = {
  movies: PropTypes.array,
  error: PropTypes.any,
  status: PropTypes.string,
  poster: PropTypes.string,
};

export default MovieDetails;
