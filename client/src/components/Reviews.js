import React from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from './StarRating';

const Reviews = ({ reviews, filterOutRev }) => {
  const handleClick = async (e, id) => {
    try {
       await RestaurantFinder.delete(`/deleteReview/${id}`);
      filterOutRev(id)
    } catch (error) {
      console.log(error);
    }
  }; 

  return reviews.length === 0 ? (
    <h3>No reviews yet </h3>
  ) : (
    <div className='row row-cols-3 mb-2 px-3'>
      {reviews.map((rev) => (
        <div
          key={rev.id}
          className='card text-white bg-primary mb-3 mr-4'
          style={{ maxWidth: '30%' }}
        >
          <div className='card-header d-flex justify-content-between'>
            <span>{rev.name}</span>
            <span>
              <StarRating rating={rev.rating} />
            </span>
          </div>
          <div className='card-body' style={{ position: 'relative' }}>
            <p className='card-text'>{rev.review}</p>

            <i
              style={styles.trash}
              className='far fa-trash-alt'
              onClick={(e) => handleClick(e, rev.id)}
            ></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;

const styles = {
  trash: {
    color: '#555',
    position: 'absolute',
    right: '7px',
    bottom: '7px',
    cursor: 'pointer',
  },
};
