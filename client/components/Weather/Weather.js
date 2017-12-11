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

  componentDidMount() {
    this.interval = setInterval(this.fetchWeatherComponentFunc, 1800000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    // setInterval(this.fetchWeatherComponentFunc, 36000000);
    console.log('$$$$$$$$$$$$$$$$$$$$$$$ from weather component, this.props: ', this.props);
    const weather = this.props.weather.res;
    if (!weather) {
      return (
        <p>Weather is here, wish you were wonderful.</p>
      );
    }
    const iconMap = {
      clouds: <i className="material-icons">wb_cloudy</i>,
      rain: <i className="material-icons">wb_grain</i>,
      clear: <i className="material-icons" >wb_sunny</i>,
      snow: <i className="material-icons" >ac_unit</i>,
      mist: <i className="material-icons" >line_weight</i>,
      fog: <i className="material-icons" >line_weight</i>,
    };
    const iconKey = weather.weather[0].main.toLowerCase();
    const icon = iconMap[iconKey];
    return (
      <div>
        <h1>{Math.floor(weather.main.temp)}F</h1>
        <p>{ weather.name }</p>
        <h2>{ weather.weather[0].main.toLowerCase() } { icon }</h2>
      </div>
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
