import React from 'react';
import { useSelector } from 'react-redux';
import selectIcon from './utils/selectIcon';
import changeCuisineNameIfTooLong from './utils/changeCuisineName';

import Spinner from '../UI/Spinner/Spinner';

import './Restaurants.css';

import StarIcon from '../../resources/images/restaurantCardsIcons/star.png';
import CuisineIcon from '../../resources/images/restaurantCardsIcons/Dinner.png';
import ReviewIcon from '../../resources/images/restaurantCardsIcons/Reviews.png';
import BoroughIcon from '../../resources/images/restaurantCardsIcons/Borough.png';

const Restaurants = () => {
  const fetchedRestaurants = useSelector(
    (state) => state.restaurants.restaurants
  );
  const isLoading = useSelector((state) => state.restaurants.isLoading);
  const error = useSelector((state) => state.restaurants.error);
  const currentPage = useSelector((state) => state.restaurants.currentPage);
  const currentLimit = useSelector((state) => state.restaurants.currentLimit);

  if (isLoading)
    return (
      <div className='MainContainer'>
        <Spinner />
      </div>
    );

  const fetchedRestaurantsBlocks = fetchedRestaurants.map((restaurant) => {
    let cuisineName = changeCuisineNameIfTooLong(restaurant.cuisine);

    return (
      <div key={restaurant._id} className='restaurant-block'>
        <div className='heading'>
          <h1>{restaurant.name}</h1>
          <div className='imgContainer'>
            <img src={StarIcon} alt='Star Icon' />
            <p>{restaurant.avgGrade ? restaurant.avgGrade.toFixed(1) : '?'}</p>
          </div>
        </div>
        <div className='divider'></div>
        <div className='content'>
          <div className='first-col'>
            <div className='top'>
              <h2>
                <img src={CuisineIcon} alt='Dinner Icon' /> {cuisineName}
              </h2>
            </div>
            <div className='bottom'>
              <h3>
                <img src={ReviewIcon} alt='Reviews Icons' />{' '}
                {restaurant.numberOfGrades} reviews
              </h3>
              <h4>
                <img src={BoroughIcon} alt='Borough Icons' />{' '}
                {restaurant.borough}
              </h4>
            </div>
          </div>
          <div className='second-col'>{selectIcon(restaurant.cuisine)}</div>
        </div>
        <a href={`restaurant?id=${restaurant._id}`}>Check It</a>
      </div>
    );
  });

  console.log(fetchedRestaurants);

  return (
    <div className='MainContainer'>
      <div className='container restaurants-container'>
        {fetchedRestaurantsBlocks}
      </div>
    </div>
  );
};

export default Restaurants;
