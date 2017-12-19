import React from 'react';
import Link from '../Link';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class Navigation extends React.Component {
  render() {
    return (
      <nav ref={(node) => { this.root = node; }} className={[s.black, s['white-text']].join(' ')}>
        <Link to="/">Home</Link> {// eslint-disable-line
        }
        <Link to="/about">About</Link>{// eslint-disable-line
        }
        <Link to="/news">News</Link>{// eslint-disable-line
        }
        <Link to="/weather">Weather</Link>{// eslint-disable-line
        }
        <Link to="/time">Time</Link>{// eslint-disable-line
        }
        <Link to="/pet">Pet</Link>{// eslint-disable-line
        }
        <Link to="/landing">Landing</Link>{// eslint-disable-line
        }
        <Link to="/not-found">Not Found</Link>{// eslint-disable-line
        }
      </nav>
    );
  }
}

export default Navigation;
