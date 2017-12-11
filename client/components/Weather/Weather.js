import React from 'react';
import { connect } from 'react-redux';
import fetchWeather from '../../actions/weatherActions';
// import fetchTweets from '../../actions/tweetsActions';


// TODO: take all the tweets out!
class Weather extends React.PureComponent {
  constructor(props) {
    super(props);
    // this.fetchTweetsComponent = this.fetchTweetsComponent.bind(this);
    this.fetchWeatherComponentFunc = this.fetchWeatherComponentFunc.bind(this);
  }


  componentWillMount() {
    this.props.dispatch(fetchWeather());
    // this.props.dispatch(fetchTweets(4));
  }

//   fetchTweetsComponent() {
//     this.props.dispatch(fetchTweets(2));
//     const gotTime = new Date().toLocaleTimeString();
//     console.log('fired! TWEEEEEEEEEEEEETS', gotTime);
//   }

  fetchWeatherComponentFunc() {
    this.props.dispatch(fetchWeather());
    console.log('fired! WEATHER');
  }

  render() {
    // setInterval(this.fetchTweetsComponent, 5000);
    setInterval(this.fetchWeatherComponentFunc, 36000000 / 4);
    console.log('$$$$$$$$$$$$$$$$$$$$$$$ from weather component, this.props: ', this.props);
    const weather = {
      status: this.props.weather.res,
    };
    const result = weather.status ? weather.status.name : 'Weather is here, wish you were wonderful.';
    return (
      <p>{ result }</p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    // tweets: state.tweets,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     receive_weather: () => dispatch({
//       type: 'RECEIVE_WEATHER',
//     }),
//     haha: () => dispatch({
//       type: 'GET_TWEETS',
//     }),
//   };
// };

// DID NOT USE "mapDispatchToProps" bcuz if done so, this.props.<action> does not work
export default connect(mapStateToProps)(Weather);
