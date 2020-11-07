import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';


const RestaurantsList = () => {

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();

  const renderRatings = (restaurant) => {
    if (restaurant.ratings_nr === '0') {
      return <span className='text-warning ml-1'>No reviews yet</span>;
    }

    return (
      <>
        <StarRating rating={restaurant.rating_avg} />
        <span className='text-warning ml-1'>({restaurant.ratings_nr})</span>
      </>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/');
        setRestaurants(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
    await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    try {
      history.push(`/restaurants/${id}/update`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  return (
    <div className='list-group'>
      <table className='table table-dark table-hover'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Rating</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((item) => (
              <tr key={item.id} onClick={() => handleRestaurantSelect(item.id)}>
                <th scope='row'>{item.name}</th>
                <td>{item.location}</td>
                <td>{'$'.repeat(item.price_range)}</td>
                {/* <td>{item.rating_avg} {item.ratings_nr > 0 && `(${item.ratings_nr})`}</td> */}
                <td>{renderRatings(item)}</td>
                <td>
                  <button
                    onClick={(e) => handleUpdate(e, item.id)}
                    className='btn btn-warning'
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsList;
