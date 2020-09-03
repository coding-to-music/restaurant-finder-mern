import { configureStore } from '@reduxjs/toolkit';
import restaurantsReducer from '../slices/restaurantsSlice';

export default configureStore({
  reducer: {
    restaurants: restaurantsReducer,
  },
});
