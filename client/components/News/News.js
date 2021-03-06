import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setInterval } from 'timers';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import * as l from '../Layout/Layout.css';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
    this.username = '';
  }

  componentWillMount() {
    this.getNews();
    this.username = this.props.username.username;
  }

  componentDidMount() {
    this.interval = setInterval(() => (
      this.getNews()), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getNews() {
    axios.get(`https://www.reddit.com/r/${this.props.subreddit}/.json`)
      .then((res) => {
        const newsResults = res.data.data.children.map(obj => obj.data);
        newsResults.length = 6;
        this.setState({ news: newsResults });
      })
      .catch((err) => {
        console.log('An error occurred trying to get the news component to load: ', err);
      });
  }

  render() {
    const newsCardStyle = {
      margin: '15px 10px auto auto',
      fontWeight: 600,
      padding: 0,
      width: 450,
      height: 110,
      display: 'inline-block',
      textAlign: 'center',
      verticalAlign: 'top',
    };
    const news = {
      status: this.state.news,
    };
    const result = news.status.map(post =>
      (
        <li key={post.id} className={[s.card, s.small, l['main-color-background']].join(' ')} style={newsCardStyle}>
          <div className={[s['card-content'], l.url].join(' ')}>
            <a href={post.url} className={s['black-text']}>
              <marquee direction="left" scrollamount="2" behavior="scroll">{post.title}</marquee>
              {/* <span className={s['center-align']}>{post.title}</span> */}
            </a>
          </div>
          <div className={[s['card-action'], l.source].join(' ')}>
            <div className={[s.left, s['valign-wrapper']].join(' ')}>
              <a href={post.domain}>
                <span className={[s.chip, s.truncate, s.white, s['black-text'], s.truncate].join(' ')}>{post.domain}</span>
              </a>
            </div>
            <div className={[s.right, s['valign-wrapper']].join(' ')}>
              <span className={[s.chip, s.white, s['black-text']].join(' ')}>{post.score}</span>
            </div>
          </div>
        </li>));
    return (
      <div className={[s['center-align'], l['main-text-color'], l.news].join(' ')}>
        <h3>{`News from /r/${this.props.subreddit}`}</h3>
        <ul className={l.component}>
          { result }
        </ul>
      </div>
    );
  }
}

News.propTypes = {
  subreddit: PropTypes.string,
};

News.defaultProps = {
  subreddit: 'news/new',
};

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(News);
