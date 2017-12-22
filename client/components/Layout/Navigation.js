import React from 'react';
import Link from '../Link';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class Navigation extends React.Component {
  render() {
    const navStyle = {
      margin: 0,
      top: 0,
      right: 'auto',
      bottom: 'auto',
      left: 20,
      position: 'fixed',
    };
    const navLinkStyle = {
      marginRight: 15,
    };
    return (
      <nav ref={(node) => { this.root = node; }} className={[s.black, s['white-text']].join(' ')}>
        <div className={s['fixed-action-btn']} style={navStyle}>
          <Link to="/" className={[s['btn-floating'], s.blue].join(' ')} style={navLinkStyle}>Home</Link>
          <Link to="/about" className={[s['btn-floating'], s.red].join(' ')} style={navLinkStyle}>About</Link>
          <Link to="/news" className={[s['btn-floating'], s.yellow, s['darken-1']].join(' ')} style={navLinkStyle}>News</Link>
          <Link to="/weather" className={[s['btn-floating'], s.green].join(' ')} style={navLinkStyle}>Weather</Link>
          <Link to="/time" className={[s['btn-floating'], s.blue].join(' ')} style={navLinkStyle}>Time</Link>
          <Link to="/pet" className={[s['btn-floating'], s.red].join(' ')} style={navLinkStyle}>Pet</Link>
          <Link to="/landing" className={[s['btn-floating'], s.yellow, s['darken-1']].join(' ')} style={navLinkStyle}>Landing</Link>
          <Link to="/not-found" className={[s['btn-floating'], s.green].join(' ')} style={navLinkStyle}>Not Found</Link>
        </div>
      </nav>
    );
  }
}

export default Navigation;
