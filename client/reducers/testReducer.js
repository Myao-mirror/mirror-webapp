const testInitialState = {
  testState: false,
  err: null,
};

const testReducer = (state = testInitialState, action) => {
  switch (action.type) {
    case 'TEST_DISPLAY': {
      state = { ...state, testState: action.payload };
      break;
    }
    case 'DISPLAY_ERROR': {
      state = { ...state, err: action.payload };
      break;
    }
    default:
      return state;
  }
  return state;
};

export default testReducer;
