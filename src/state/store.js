import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../pages/home/home.state";
import authReducer from '../pages/Authentication/auth.reducer';
export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  }
})