import React from 'react';
import PropTypes from 'prop-types';
import s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class Counter extends React.PureComponent {
  render() {
    return (
      <div className="row section">
        <button className={s.btn} onClick={this.props.decreaseCount}>
          -
        </button>
        <span>{this.props.countValue}</span>
        <button className={s.btn} onClick={this.props.increaseCount}>
          +
        </button>
      </div>
    );
  }
}

Counter.propTypes = {
  decreaseCount: PropTypes.number,
  increaseCount: PropTypes.number,
  countValue: PropTypes.number,
};

Counter.defaultProps = {
  decreaseCount: -1,
  increaseCount: +1,
  countValue: 0,
};

export default Counter;
