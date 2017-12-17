const usernameInitialState = {
  fname: '',
  fruit: '',
  username: '',
};

const usernameReducer = (state = usernameInitialState, action) => {
  switch (action.type) {
    case 'USERNAME_FORM_SUBMIT': {
      state = {
        ...state,
        fname: action.payload.fname,
        fruit: action.payload.fruit,
        username: action.payload.username,
      };
      break;
    }
    default:
      return state;
  }
  return state;
};

export default usernameReducer;
