const weatherInitialState = {
  fetching: false,
  fetched: false,
  err: null,
  res: null,
};

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

export default weatherReducer