import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../pages/home/home.state";
export default configureStore({
  reducer: {
    counter: counterReducer
  }
})