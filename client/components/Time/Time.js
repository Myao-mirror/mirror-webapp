import React from 'react';
// import history from '../../history';
// import { Layout } from '../Layout';

function getTimeNDay() {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const gotTime = new Date().toLocaleTimeString();
  const time = gotTime.slice(0, 4) + gotTime.slice(7, 10);
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
    // this.getTimeNDay = this.getTimeNDay.bind(this);
  }

  // getTimeNDay() {      
  //   const options = {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   };
  //   const gotTime = new Date().toLocaleTimeString();
  //   const time = gotTime.slice(0, 4) + gotTime.slice(8, 10);
  //   const date = new Date().toLocaleDateString('en-US', options);
  //   const timeNday = {
  //     time: time,
  //     day: date,
  //   };
  //   return timeNday;
  // }

  updateTime() {
    this.setState({
      time: getTimeNDay().time,
      date: getTimeNDay().day,
      // day: new Date().getDay(),
    });
  }

  render() {
    // const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.state.day];
    setInterval(this.updateTime, 60000);
    return (
      <div>
        <h4>Hello</h4>
        <h2>{this.state.time}</h2>
        <h5>{this.state.date}</h5>
      </div>
    );
  }
}


export default Time;

