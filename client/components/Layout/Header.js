import React from 'react';
import Link from '../Link';
import Navigation from './Navigation';
import Logo from './Logo';

class Header extends React.Component {
  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header ref={(node) => { this.root = node; }}>
        <Link to="/">
          <Logo />
        </Link>
        <Navigation />
      </header>
    );
  }
}
export default Header;
