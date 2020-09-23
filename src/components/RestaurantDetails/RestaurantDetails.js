import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import mapboxgl from 'mapbox-gl';

import Spinner from '../UI/Spinner/Spinner';

import gradesIcon from '../../resources/images/restaurantDetails/grades.png';
import restaurantIcon from '../../resources/images/restaurantDetails/restaurant.png';
import locationIcon from '../../resources/images/restaurantDetails/location.png';

import './RestaurantDetails.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYmFydGVrdzIyMTMiLCJhIjoiY2tjcHVndWs1MHlucDJ5bHU1bGw5ZmZqZCJ9.HoWCcWI4hTLLmqcFeHF5Tg';

const RestaurantDetails = (props) => {
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [restaurantGrades, setRestaurantGrades] = useState([]);
  const id = props.location.search.split('').slice(4).join('');

  const setMap = useCallback((location) => {
    const map = new mapboxgl.Map({
      container: 'mapboxContainer',
      style: 'mapbox://styles/mapbox/navigation-guidance-day-v4',
      center: location.coordinates,
      zoom: 12,
    });

    new mapboxgl.Marker().setLngLat(location.coordinates).addTo(map);
  }, []);

  const fetchRestaurantInfo = useCallback(async () => {
    const response = await axios.get('/api/searchRestaurants/byId', {
      params: { id },
    });
    setRestaurantInfo(response.data);
    setRestaurantGrades(response.data.grades);
    setMap(response.data.address.location);
  }, [id, setMap]);

  console.log(restaurantInfo);

  useEffect(() => {
    fetchRestaurantInfo();
  }, [id, fetchRestaurantInfo]);

  const gradesList = restaurantGrades.map((grade, index) => (
    <div key={index} className='grade'>
      <span className='gradeLetter'>{grade.grade}</span>
      <span className='score'>Score: {grade.score}</span>
      <span className='date'>{moment(grade.date).format('MMM Do YYYY')}</span>
    </div>
  ));

  if (!restaurantInfo.name)
    return (
      <div className='MainContainer'>
        <Spinner />;
      </div>
    );

  return (
    <div className='MainContainer'>
      <div className='RestaurantDetailsContainer'>
        <div className='RestaurantDetails'>
          <h1>
            <img src={restaurantIcon} alt='Restaurant Icon' />{' '}
            {restaurantInfo.name}
          </h1>
          <div className='restaurant-subtitle'>
            <p>{restaurantInfo.grades.length} Reviews</p>
            <p>Restaurant ID: {restaurantInfo.restaurant_id}</p>
            <p>{restaurantInfo.cuisine}</p>
          </div>
          <div className='restaurant-subtitle'>
            <p>
              {restaurantInfo.address.street} {restaurantInfo.address.building}{' '}
              {restaurantInfo.address.zipcode}
            </p>
            <p>{restaurantInfo.borough}</p>
          </div>
        </div>
        <div className='secondRow'>
          <div className='gradesContainer'>
            <h1>
              <img src={gradesIcon} alt='Grades Icon' /> Grades
            </h1>
            <div className='gradesListContainer'>{gradesList}</div>
          </div>
          <div className='mapContainerDiv'>
            <h1>
              <img src={locationIcon} alt='Location Icon' /> Location
            </h1>
            <div className='mapboxParentContainer'>
              <div id='mapboxContainer' className='mapboxContainer' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
