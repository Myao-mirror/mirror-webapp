import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counter from '../../reducer';
import Layout from '../../components/Layout';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
// import Materialize from '../../../node_modules/materialize-css/dist/css'
const store = createStore(counter);

class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then((res) => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Layout>
          <div className={s.row}>
            <h1>{`/r/${this.props.subreddit}`}</h1>
            <ul>
              {this.state.posts.map(post =>
                <li key={post.id}>{post.title}</li>)}
            </ul>
          </div>
        </Layout>
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
