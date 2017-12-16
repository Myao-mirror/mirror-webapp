import React from 'react';

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
    time: time,
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
      <div>
        <h4>Myao Mirror</h4>
        <h2>{this.state.time}</h2>
        <h5>{this.state.date}</h5>
      </div>
    );
  }
}


export default Time;

