import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as moviesAPI from '../../api';
import { List, Item, Author, Review, NoReview } from './Reviews.styled';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    setStatus('pending');

    async function getReviews() {
      try {
        const { results } = await moviesAPI.getReviewsById(movieId);

        setReviews(results);
        setStatus('resolved');
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }

    getReviews();
  }, []);

  return (
    <>
      {status === 'rejected' && <h3>{error}</h3>}
      {status === 'resolved' && reviews.length > 0 && (
        <List>
          {reviews.map(({ author, content, id }) => (
            <Item key={id}>
              <Author>Author: {author}</Author>
              <Review>{content}</Review>
            </Item>
          ))}
        </List>
      )}
      {status === 'resolved' && reviews.length === 0 && (
        <NoReview>We dont have any reviews for this movie</NoReview>
      )}
    </>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array,
  error: PropTypes.any,
  status: PropTypes.string,
};

export default Reviews;
