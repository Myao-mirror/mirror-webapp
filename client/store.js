import { combineReducers, applyMiddleware, createStore } from 'redux';

// import thunk from 'redux-thunk';

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
const logger = (store) => (next) => (action) => {
  console.log('action fired ', action);
  next(action);
};
const middleware = applyMiddleware(logger);

// create in diff files, , then import here
const weatherReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_CITY': {
      state = { ...state, city: action.payload };
      break;
    }
    case 'CHANGE_TEMP': {
      state = { ...state, temp: action.payload };
      break;
    }
    default:
      return state;
  }
  return state;
};


// create in diff files, then import here
const tweetsReducer = (state = [], action) => {
  return state;
};

// combine them
const reducers = combineReducers({
  weather: weatherReducer, // what data we modify(weather), using what(weatherReducer)
  tweets: tweetsReducer,
});

const store = createStore(reducers, {}, middleware);
store.subscribe(() => {
  console.log('************** store changed', store.getState());
});

store.dispatch({ type: 'CHANGE_CITY', payload: 'Shanghai' });
store.dispatch({ type: 'CHANGE_TEMP', payload: '33' });

export default store;
