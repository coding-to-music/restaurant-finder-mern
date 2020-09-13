import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
  name: 'restaurants',
  initialState: {
    currentFormData: {},
    restaurants: [],
    error: null,
    isLoading: false,
    totalPageCount: 1,
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
    setTotalPageCount: (state, action) => {
      state.totalPageCount = action.payload;
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
  setTotalPageCount,
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
    dispatch(
      setTotalPageCount(
        Math.ceil(
          response.data.fetchedRestaurants[0].totalCount[0].count /
            queryData.queryLimit
        )
      )
    );
    dispatch(saveCurrentFormData(queryData));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLoading(false));
    setTimeout(() => dispatch(unsetError()), 5000);
  }
};

export default slice.reducer;
