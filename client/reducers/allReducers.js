import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';

const reducers = combineReducers({
  weather: weatherReducer, // what data we modify(weather), using what(weatherReducer)
});

export default reducers;
