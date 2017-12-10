import { combineReducers, applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

// Centralized application state
// For more information visit http://redux.js.org/
// const store = createStore((state, action) => {
//   // TODO: Add action handlers (aka "reduces")
//   switch (action) {
//     case 'COUNT':
//       return { ...state, count: (state.count || 0) + 1 };
//     default:
//       return state;
//   }
// });

// BITCH WHY YOU COMPLAIN!
// const logger = (store) => (next) => (action) => {
//   console.log('action fired ', action);
//   next(action);
// };
const middleware = applyMiddleware(thunk, logger);

const weatherInitialState = {
  fetching: false,
  fetched: false,
  // weather: [],
  err: null,
  res: null,
};

// create in diff files, , then import here
const weatherReducer = (state = weatherInitialState, action) => {
  switch (action.type) {
    // case 'CHANGE_CITY': {
    //   state = { ...state, city: action.payload };
    //   break;
    // }
    // case 'CHANGE_TEMP': {
    //   state = { ...state, temp: action.payload };
    //   break;
    // }
    case 'REQUEST_WEATHER': {
      // TODO: take the data: action.payload out
      state = {
        ...state,
        fetching: true,
        // data: action.payload
      };
      break;
    }
    case 'RECEIVE_WEATHER': {
      state = {
        ...state,
        fetching: false,
        fetched: true,
        res: action.payload,
      };
      break;
    }
    case 'WEATHER_ERROR': {
      state = { ...state, fetching: false, err: action.payload };
      break;
    }
    default:
      return state;
  }
  return state;
};


// create in diff files, then import here
const tweetsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TWEETS': {
      state = { ...state, tweets: 'GOT tweets' };
      break;
    }
    default:
      return state;
  }
  return state;
};

// combine them
const reducers = combineReducers({
  weather: weatherReducer, // what data we modify(weather), using what(weatherReducer)
  tweets: tweetsReducer,
});

const store = createStore(reducers, middleware);
store.subscribe(() => {
  console.log('************** store changed', store.getState());
});

// these are the example to dispacth single actions one by one
// store.dispatch({ type: 'CHANGE_CITY', payload: 'Shanghai' });
// store.dispatch({ type: 'CHANGE_TEMP', payload: '33' });


// dispatch things together ASYNC
store.dispatch((dispatch) => {
  dispatch({ type: 'REQUEST_WEATHER' });
  const apiKey = '91989caa792ff47f0d8628d457e8864b';
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=seattle&appid=${apiKey}`)
    .then((res) => {
      dispatch({ type: 'RECEIVE_WEATHER', payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: 'WEATHER_ERROR', payload: err });
    });
  dispatch({ type: 'GET_TWEETS' });
});

export default store;
