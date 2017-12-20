import React from 'react';
import Header from './Header';
import s from './Layout.css';

class Layout extends React.Component {
  render() {
    return (
      <div ref={(node) => { this.root = node; }}>
        <Header />
        <main {...this.props} className={s.content} />
      </div>
    );
  }
}

export default Layout;
