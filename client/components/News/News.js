import React from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counter from '../../reducer';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
// import Materialize from '../../../node_modules/materialize-css/dist/css'
const store = createStore(counter);

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then((res) => {
        const news = res.data.data.children.map(obj => obj.data);
        this.setState({ news });
      });
  }

  render() {
    const newsCardStyle = {
      margin: '1vw',
      width: '26vw',
      height: '100px',
      display: 'inline-block',
      verticalAlign: 'top',
    };
    return (
      <Provider store={store}>
        <div className={s.section}>
          <h3>{`The Latest News from /r/${this.props.subreddit}`}</h3>
          <ul>
            <div>
              {this.state.news.map(post =>
            (
              <li key={post.id} className={[s['card-panel'], s.white].join(' ')} style={newsCardStyle}>
                <div className={s['card-content']}>
                  <a href={post.url} className={s['black-text']}>
                    <h6>{post.title}</h6>
                  </a>
                </div>
                <div className={s['card-action']}>
                  <div className={s.left}>
                    <a href={post.domain} className={[s['black-text'], s.truncate].join(' ')}>
                      <h6>{post.domain}</h6>
                    </a>
                  </div>
                  <div className={s.right}>
                    <span className={s.chip}>{post.score}</span>
                  </div>
                </div>
              </li>))}
            </div>
          </ul>
        </div>
      </Provider>
    );
  }
}

News.propTypes = {
  subreddit: PropTypes.string,
};

News.defaultProps = {
  subreddit: 'neutralnews',
};

export default News;
