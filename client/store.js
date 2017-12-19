import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/allReducers';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);
// Put subscriptions here in the future
// store.subscribe(() => {});

export default store;
