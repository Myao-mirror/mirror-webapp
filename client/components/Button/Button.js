import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

class Button extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const { className, ...other } = this.props;
    return (
      <button
        ref={node => { this.root = node; }}
        className={cx('mdl-button mdl-js-button', className)}
        {...other}
      />
    );
  }
}

export default Button;
