import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: [],
    error: null,
  },
  reducers: {
    changeCurrentRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    unsetError: (state) => {
      state.error = null;
    },
  },
});

const { changeCurrentRestaurants, setError, unsetError } = slice.actions;

export const fetchRestaurantsByDefault = (queryData) => async (dispatch) => {
  try {
    const response = await axios.get('/api/searchRestaurants/byDefault', {
      params: queryData,
    });
    dispatch(changeCurrentRestaurants(response.data.fetchedRestaurants));
  } catch (error) {
    dispatch(setError(error));
    setTimeout(() => dispatch(unsetError()), 5000);
  }
};

export default slice.reducer;
