const weatherInitialState = {
  fetching: false,
  fetched: false,
  err: null,
  res: null,
};

const weatherReducer = (state = weatherInitialState, action) => {
  switch (action.type) {
    case 'REQUEST_WEATHER': {
      state = {
        ...state,
        fetching: true,
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

export default weatherReducer;
