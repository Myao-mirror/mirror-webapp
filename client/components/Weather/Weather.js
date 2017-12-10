import React from 'react';
import { connect } from 'react-redux';
import fetchWeather from '../../actions/weatherActions';
import fetchTweets from '../../actions/tweetsActions';


class Weather extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fetchTweetsComponent = this.fetchTweetsComponent.bind(this);
    this.fetchWeatherComponentFunc = this.fetchWeatherComponentFunc.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(fetchWeather());
    this.props.dispatch(fetchTweets(4));
  }

  fetchTweetsComponent() {
    this.props.dispatch(fetchTweets(2));
  }

  fetchWeatherComponentFunc() {
    this.props.dispatch(fetchWeather());
  }

  render() {
    // setInterval(this.fetchTweetsComponent, 2000);
    setInterval(this.fetchWeatherComponentFunc, 30000);
    console.log('@@@@@@@@@@@@@@@@@@weather from store injected to component', this.props);
    const weatherstyle = {
      border: '4px solid white',
    };
    const weather = {
      status: this.props.weather.res,
    };
    const result = weather.status ? weather.status.name : 'No weather';
    return (
    // TODO: sometimes there is no res from API call, make sure to catch err, otherwise res.name will say null object ref
      <h2>{ result }</h2>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    tweets: state.tweets,
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


export default connect(
  mapStateToProps,
//   mapDispatchToProps,
)(Weather);

// export default Weather;
