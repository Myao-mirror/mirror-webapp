import React from 'react';
import { connect } from 'react-redux';
import fetchWeather from '../../actions/weatherActions';
import Cloud from './weatherIcons/cloud';
import Sunny from './weatherIcons/sunny';
import Mist from './weatherIcons/mist';
import BigRain from './weatherIcons/bigRain';
import Snowflake from './weatherIcons/snowflake';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import * as l from '../Layout/Layout.css';

class Weather extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fetchWeatherComponentFunc = this.fetchWeatherComponentFunc.bind(this);
    this.username = '';
  }

  componentWillMount() {
    this.username = this.props.username.username;
    this.props.dispatch(fetchWeather());
  }
  componentDidMount() {
    // make weather api call every 15min
    this.interval = setInterval(this.fetchWeatherComponentFunc, 900000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchWeatherComponentFunc() {
    this.props.dispatch(fetchWeather());
  }

  render() {
    const weather = this.props.weather.res;
    if (!weather) {
      return (
        <p>Weather is here, wish you were wonderful.</p>
      );
    }
    const iconMap = {
      clouds: <Cloud height="3rem" width="3rem" />,
      rain: <BigRain height="3rem" width="3rem" />,
      clear: <Sunny height="3rem" width="3rem" />,
      snow: <Snowflake height="3rem" width="3rem" />,
      mist: <Mist height="3rem" width="3rem" />,
      fog: <Mist height="3rem" width="3rem" />,
    };
    const iconKey = weather.weather[0].main.toLowerCase();
    const icon = iconMap[iconKey];
    return (
      <div className={l.component}>
        <h3>{ weather.name }</h3>
        <h1>{Math.floor(weather.main.temp)}˚F</h1>
        <h2>{ weather.weather[0].main.toLowerCase() } {icon}</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  weather: state.weather,
  username: state.username,
});

// DID NOT USE "mapDispatchToProps" bcuz if done so, this.props.<action> does not work
export default connect(mapStateToProps)(Weather);
