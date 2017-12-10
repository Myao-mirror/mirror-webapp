import React from 'react';
import Link from '../Link';

class Navigation extends React.Component {
  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <nav ref={(node) => { this.root = node; }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/not-found">Not Found</Link>
      </nav>
    );
  }
}

export default Navigation;
