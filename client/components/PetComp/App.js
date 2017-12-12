import { connect } from 'react-redux';
import Counter from './Counter';

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    countValue: state.count,
  };
}

// Action
const increaseAction = { type: 'increase' };
const decreaseAction = { type: 'decrease' };

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    increaseCount() {
      return dispatch(increaseAction);
    },
    decreaseCount() {
      return dispatch(decreaseAction);
    },
  };
}

// The HOC
const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);

export default connectedComponent;
