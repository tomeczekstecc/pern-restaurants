import React, { useEffect, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';


const AddReview = ({ fetchData }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [rating, setRating] = useState('Rating');
  const [review, setReview] = useState('');
  const [counter, setCounter] = useState(0);

  const handleChange = (e) => {
    if (e.target.id === 'name') setName(e.target.value);
    if (e.target.id === 'rating') setRating(e.target.value);
    if (e.target.id === 'Review') setReview(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review,
        rating,
      });
      setCounter((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [counter]);

  return (
    <div className='mb-2'>
      <form action=''>
        <div className='form-row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              className='form-control'
              placeholder='name'
              value={name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              id='rating'
              className='custom-select'
              onChange={(e) => handleChange(e)}
              value={rating}
            >
              <option disabled value='Rating'>
                {' '}
                Rating
              </option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='Review'>Review</label>
          <textarea
            id='Review'
            placeholder='Review'
            className='form-control'
            onChange={(e) => handleChange(e)}
            value={review}
          ></textarea>
          <div className='btn btn-primary my-2' onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
