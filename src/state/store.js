import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../pages/home/home.state";
import authReducer from '../pages/Authentication/auth.reducer';
import resetPasswordReducer from '../pages/Authentication/resetPassword.reducer';
export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    resetPassword: resetPasswordReducer
  }
})