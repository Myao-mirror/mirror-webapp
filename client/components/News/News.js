import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setInterval } from 'timers';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';


const mapStateToProps = state => ({
  news: state.news,
});

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
  }

  componentWillMount() {
    // axios.get(`http://www.reddit.com/r/${this.props.subreddit}/.json`)
    //   .then((res) => {
    //     const news = res.data.data.children.map(obj => obj.data);
    //     news.length = 6;
    //     this.setState({ news });
    //   });
    this.getNews();
  }

  componentDidMount() {
    // TODO: LOOKS LIKE IF WE DON'T SETSTATE IN INTERVALS THE ERROR WILL GO AWAY
    // this.interval = setInterval(() => (
    //   axios.get(`http://www.reddit.com/r/${this.props.subreddit}/.json`)
    //     .then((res) => {
    //       const news = res.data.data.children.map(obj => obj.data);
    //       news.length = 6;
    //       this.setState({ news });
    //     })), 10000);
    this.interval = setInterval(this.getNews(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getNews() {
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}/.json`)
      .then((res) => {
        const news = res.data.data.children.map(obj => obj.data);
        news.length = 6;
        this.setState({ news });
      })
      .catch((err) => {
        console.log('** An error occurred getting news on page load: ', err);
      });
  }

  render() {
    const newsCardStyle = {
      margin: '10px 10px auto auto',
      fontWeight: 600,
      width: '40%',
      maxHeight: '15vh',
      display: 'inline-block',
      textAlign: 'center',
      verticalAlign: 'top',
    };
    const news = {
      status: this.state.news,
    };
    console.log('---------------, news.status: ', news.status);
    const result = news.status.map(post =>
      (
        <li key={post.id} className={[s.card, s.small, s.lime].join(' ')} style={newsCardStyle}>
          <div className={s['card-content']}>
            <a href={post.url} className={s['black-text']}>
              <span className={s['center-align']}>{post.title}</span>
            </a>
          </div>
          <div className={s['card-action']}>
            <div className={[s.left, s['valign-wrapper']].join(' ')}>
              <a href={post.domain}>
                <span className={[s.chip, s.truncate, s.black, s['white-text']].join(' ')}>{post.domain}</span>
              </a>
            </div>
            <div className={[s.right, s['valign-wrapper']].join(' ')}>
              <span className={[s.chip, s.black, s['white-text']].join(' ')}>{post.score}</span>
            </div>
          </div>
        </li>));
    return (
      <div className={s['center-align']}>
        <h3>{`News from /r/${this.props.subreddit}`}</h3>
        <ul>
          <div>
            { result }
          </div>
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

export default connect(mapStateToProps)(News);
