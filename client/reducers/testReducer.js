const testInitialState = {
  testState: false,
};

const testReducer = (state = testInitialState, action) => {
  switch (action.type) {
    case 'TEST_DISPLAY': {
      state = { ...state, testState: action.payload };
      break;
    }
    default:
      return state;
  }
  return state;
};

export default testReducer;
