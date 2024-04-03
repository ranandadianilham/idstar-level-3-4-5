import axios from 'axios';
import * as dataSlice from './home.state'; // Import relevant slice actions

export const fetchData = () => async (dispatch) => {
  dispatch(dataSlice.fetchAllRequest());
  try {
    const response = await axios.get('https://dummyjson.com/products');
    console.log('re', response.data);
    dispatch(dataSlice.fetchAllDataSuccess(response.data));
  } catch (error) {
    dispatch(dataSlice.fetchAllDataFailure(error.message));
  }
};