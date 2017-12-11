import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import tweetsReducer from './tweetsReducer';
import postsReducer from './postsReducer';


const reducers = combineReducers({
  weather: weatherReducer, // what data we modify(weather), using what(weatherReducer)
  tweets: tweetsReducer,
  posts: postsReducer,
});

export default reducers;
