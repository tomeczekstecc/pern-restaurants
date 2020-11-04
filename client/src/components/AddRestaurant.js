import React, { useContext, useState } from 'react';
import RestaurantFinter from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await RestaurantFinter.post('/', {
        name,
        location,
        price_range: priceRange,
      });
      console.log(response);
      addRestaurants(response.data.data[0]);
      setName('');
      setLocation('');
      setPriceRange('Price Range');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mb-4'>
      <form className='form-row'>
        <div className='col'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            className='form-control'
            placeholder='name'
          />
        </div>
        <div className='col'>
          <input
            type='text'
            className='form-control'
            placeholder='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='col'>
          <select
            type='text'
            className='custom-select
            mr-sm-2 '
            placeholder='location'
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option disabled>Price Range</option>
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$</option>
          </select>
        </div>
        <button onClick={handleSubmit} className='btn btn-primary'>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
