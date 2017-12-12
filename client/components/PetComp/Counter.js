import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT ' });
  }
  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT ' });
  }
  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}> - </button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}> + </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
  };
}

export default connect(mapStateToProps)(Counter);

// import PropTypes from 'prop-types';
// import s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

// class Counter extends React.PureComponent {
//   render() {
//     return (
//       <div className={s.section}>
//         <button className={s.btn} onClick={this.props.decreaseCount}>
//           -
//         </button>
//         <span>{this.props.countValue}</span>
//         <button className={s.btn} onClick={this.props.increaseCount}>
//           +
//         </button>
//       </div>
//     );
//   }
// }

// Counter.propTypes = {
//   decreaseCount: PropTypes.number,
//   increaseCount: PropTypes.number,
//   countValue: PropTypes.number,
// };

// Counter.defaultProps = {
//   decreaseCount: -1,
//   increaseCount: +1,
//   countValue: 0,
// };

// export default Counter;
