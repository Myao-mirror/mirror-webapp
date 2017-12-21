import React from 'react';
import { connect } from 'react-redux';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

function getTimeNDay() {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const gotTime = new Date().toLocaleTimeString();
  const time = gotTime;
  const date = new Date().toLocaleDateString('en-US', options);
  const timeNday = {
    time,
    day: date,
  };
  return timeNday;
}

class Time extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      time: getTimeNDay().time,
      date: getTimeNDay().day,
    };
    this.updateTime = this.updateTime.bind(this);
    this.username = '';
  }

  componentWillMount() {
    this.username = this.props.username.username;
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime() {
    this.setState({
      time: getTimeNDay().time,
      date: getTimeNDay().day,
    });
  }

  render() {
    return (
      <div className={[s['center-align'], s.panel, s.black].join(' ')}>
        <h2>{this.state.time}</h2>
        <h5>{this.state.date}</h5>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(Time);

