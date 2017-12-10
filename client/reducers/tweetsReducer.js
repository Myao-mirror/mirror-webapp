const tweetsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TWEETS': {
      state = { ...state, tweets: action.payload };
      break;
    }
    default:
      return state;
  }
  return state;
};

export default tweetsReducer;
