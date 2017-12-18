const usernameInitialState = {
  fname: '',
  fruit: '',
  username: '',
  exist: false,
};

const usernameReducer = (state = usernameInitialState, action) => {
  switch (action.type) {
    case 'USERNAME_FORM_ONCHANGE': {
      state = {
        ...state,
        fname: action.payload.fname,
        fruit: action.payload.fruit,
        username: action.payload.username,
      };
      break;
    }
    case 'CHECK_IF_EXIST': {
      state = {
        ...state,
        exist: action.payload,
      };
      break;
    }
    default:
      return state;
  }
  return state;
};

export default usernameReducer;
