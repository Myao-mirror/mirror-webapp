import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import tweetsReducer from './tweetsReducer';
import testReducer from './testReducer';


const reducers = combineReducers({
  weather: weatherReducer, // what data we modify(weather), using what(weatherReducer)
  tweets: tweetsReducer,
  test: testReducer,
});

export default reducers;
