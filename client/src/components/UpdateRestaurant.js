import React, {useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setName(response.data.data.name);
      setLocation(response.data.data.location);
      setPriceRange(response.data.data.price_range);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    console.log(updatedRestaurant);
    history.push('/');
  };

  return (
    <div>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='form-control'
            name='name'
            id='name'
            type='text'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='form-control'
            name='location'
            id='location'
            type='text'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className='form-control'
            name='price_range'
            id='price_range'
            min='0'
            max='5'
            step='1'
            type='number'
          />
        </div>
        <button onClick={handleSubmit} className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
