import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import tweetsReducer from './tweetsReducer';
import postsReducer from './postsReducer';
import petReducer from './petReducer';


const reducers = combineReducers({
  weather: weatherReducer, // what data we modify(weather), using what(weatherReducer)
  tweets: tweetsReducer,
  posts: postsReducer,
  pet: petReducer,
});

export default reducers;
