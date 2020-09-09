import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'restaurants',
  initialState: {
    currentFormData: {},
    restaurants: [],
    error: null,
    isLoading: false,
    totalCount: 1,
  },
  reducers: {
    resetState: (state) => {
      state.restaurants = [];
      state.error = null;
    },
    changeCurrentRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    unsetError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    saveCurrentFormData: (state, action) => {
      state.currentFormData = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const {
  resetState,
  changeCurrentRestaurants,
  setError,
  unsetError,
  setLoading,
  saveCurrentFormData,
  setTotalCount,
} = slice.actions;

export const fetchRestaurantsByDefault = (queryData) => async (dispatch) => {
  try {
    const response = await axios.get('/api/searchRestaurants/byDefault', {
      params: queryData,
    });
    dispatch(
      changeCurrentRestaurants(
        response.data.fetchedRestaurants[0].paginatedResults
      )
    );
    dispatch(setTotalCount(response.data.fetchedRestaurants[0].totalCount));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLoading(false));
    setTimeout(() => dispatch(unsetError()), 5000);
  }
};

export default slice.reducer;
