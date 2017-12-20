import React from 'react';
import Navigation from './Navigation';
import s from './Layout.css';

class Layout extends React.Component {
  render() {
    return (
      <div ref={(node) => { this.root = node; }}>
        <Navigation />
        <main {...this.props} className={s.content} />
      </div>
    );
  }
}

export default Layout;
