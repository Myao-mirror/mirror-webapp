import React from 'react';
import { connect } from 'react-redux';
import fetchPet from '../../actions/petActions';
import Counter from './Counter';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import { setInterval } from 'timers';
// import App from './App';
// import Layout from '../../components/Layout';
// import * as s from '../../../../node_modules/materialize-css/dist/css/materialize.min.css';
// import fetchPet from '../../../actions/petActions';

function mapStateToProps(state) {
  return {
    countValue: state.count,
  };
}

const increaseAction = { type: 'increase' };
const decreaseAction = { type: 'decrease' };

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

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);

class PetComp extends React.Component {
  constructor(props) {
    super(props);
    this.count = 0;
  }

  render() {
    const pet = {
      countValue: this.props.count,
    };
    return (
      <p>{ connectedComponent }</p>
    );
  }
}

export default PetComp;
