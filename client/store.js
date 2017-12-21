import { applyMiddleware, createStore } from 'redux';
// import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/allReducers';

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

export default store;
