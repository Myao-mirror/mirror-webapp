import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import tweetsReducer from './tweetsReducer';


const reducers = combineReducers({
  weather: weatherReducer, // what data we modify(weather), using what(weatherReducer)
  tweets: tweetsReducer,
});

export default reducers;
