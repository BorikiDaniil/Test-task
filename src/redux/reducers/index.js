import { combineReducers } from 'redux'
import authReducer from './authReducer'
import bookingReducer from './productsReducer'

export default combineReducers({
  authentication: authReducer,
  booking: bookingReducer,
});

