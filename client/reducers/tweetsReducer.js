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

export default tweetsReducer;
