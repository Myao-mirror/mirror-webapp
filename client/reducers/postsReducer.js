const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_POSTS': {
      state = { ...state, posts: action.payload };
      break;
    }
    default:
      return state;
  }
  return state;
};

export default postsReducer;
