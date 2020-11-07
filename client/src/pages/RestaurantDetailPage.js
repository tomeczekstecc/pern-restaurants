import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import AddReview from '../components/AddReview';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantContext';

const RestaurantDetailPage = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  const filterOutRev = (id)=>{
    setReviews(reviews.filter((rev)=>rev.id !== id))
  }

  const fetchData = async () => {
    try {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.data.restaurant);
      setReviews(response.data.data.reviews);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [reviews]);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className='text-center display-1'>{selectedRestaurant.name}</h1>
          <div className='text-center'>
            <StarRating rating={selectedRestaurant.rating_avg} />
            <span className='text-warning ml-1'>
              ({selectedRestaurant.ratings_nr})
            </span>
          </div>
          <div className='mt-3'>
            <Reviews reviews={reviews} filterOutRev={filterOutRev} />

            <AddReview fetchData={fetchData} />
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
