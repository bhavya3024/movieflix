import { configureStore } from '@reduxjs/toolkit'
import headerReducer from './Components/Main-Page/Header/Header-Reducer';

export default configureStore({
  reducer: {
    headerReducer,
  },
});