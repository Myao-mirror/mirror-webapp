import React from 'react';
import Link from '../Link';
// import '../../../node_modules/react-mdl/extra/material';
// import '../../../node_modules/react-mdl/extra/material.css';

class Navigation extends React.Component {
  // componentDidMount() {
  //   window.componentHandler.upgradeElement(this.root);
  // }

  // componentWillUnmount() {
  //   window.componentHandler.downgradeElements(this.root);
  // }

  render() {
    return (
      <nav ref={(node) => { this.root = node; }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/time">Time</Link>
        <Link to="/pet">Pet</Link>
        <Link to="/landing">Landing</Link>
        <Link to="/not-found">Not Found</Link>
      </nav>
    );
  }
}

export default Navigation;
