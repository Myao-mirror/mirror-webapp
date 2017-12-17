import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import usernameReducer from './usernameReducer';


const reducers = combineReducers({
  weather: weatherReducer, // what data we modify(weather), using what(weatherReducer)
  username: usernameReducer,
});

export default reducers;
