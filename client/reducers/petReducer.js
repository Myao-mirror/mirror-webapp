// Reducer
const petInitialState = {
  count: 0,
};

function petReducer(state = petInitialState, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        count: state.count + 1,
      };
    }
    case 'DECREMENT': {
      return {
        count: state.count + 1,
      };
    }
    default:
      return state;
  }
}

// export default petReducer;
