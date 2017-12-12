import React from 'react';
import Header from './Header';
import s from './Layout.css';

class Layout extends React.Component {
  // componentDidMount() {
  //   window.componentHandler.upgradeElement(this.root);
  // }

  // componentWillUnmount() {
  //   window.componentHandler.downgradeElements(this.root);
  // }

  render() {
    return (
      <div ref={(node) => { this.root = node; }}>
        {/* <div className={s.ribbon}> */}
        <Header />
          {/* <div className={s.container}>
            <h1 className={s.tagline}>Introducing the Myao Mirror</h1>
            <p className={s.summary}>
              The bestest smartest mirror ever.
            </p>
          </div> */}
        {/* </div> */}
        <main {...this.props} className={s.content} />
      </div>
    );
  }
}

export default Layout;
