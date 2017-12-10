import React from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import history from '../../history';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

// const store = createStore(counter);

function getNewsNDay() {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const gotNews = new Date().toLocaleTimeString();
  const news = gotNews.slice(0, 4) + gotNews.slice(7, 10);
  const date = new Date().toLocaleDateString('en-US', options);
  const newsNday = {
    news,
    day: date,
  };
  return newsNday;
}

class News extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      news: getNewsNDay().news,
      date: getNewsNDay().day,
    };
    this.updateNews = this.updateNews.bind(this);
    // this.getNewsNDay = this.getNewsNDay.bind(this);
  }

  componentDidMount() {
    document.title = 'News';
  }

  updateNews() {
    this.setState({
      news: getNewsNDay().news,
      date: getNewsNDay().day,
      // day: new Date().getDay(),
    });
  }

  render() {
    // const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.state.day];
    setInterval(this.updateNews, 60000);
    return (
      <div className={s.row}>
        <div className={s.section}>
          <h4 className={s.purple}>Hello</h4>
          <h2 className={s.yellowText}>{this.state.news}</h2>
          <h5 className={s.red}>{this.state.date}</h5>
        </div>
      </div>
    );
  }
}


export default News;

