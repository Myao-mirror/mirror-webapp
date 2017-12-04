import React from 'react';
import Link from '../Link';
import Navigation from './Navigation';
import Logo from './Logo';
import s from './Header.css';

class Header extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header
        ref={node => { this.root = node; }}
        className="mdl-layout__header mdl-layout__header--transparent"
      >
        <div className={`mdl-layout__header-row ${s.headerRow}`}>
          <Link className="mdl-layout-title" to="/">
            <Logo />
          </Link>
          <div className="mdl-layout-spacer" />
          <Navigation />
        </div>
      </header>
    );
  }
}
export default Header;
