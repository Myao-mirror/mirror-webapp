import React from 'react';
import { connect } from 'react-redux';


class Weather extends React.PureComponent {
  render() {
    console.log('@@@@@@@@@@@@@@@@@@weather from store injected to component', this.props);
    const weatherstyle = {
      border: '4px solid white',
    };
    return (
      <h2 style={weatherstyle}>{this.props.weather.res.name}</h2>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather,
    tweets: state.tweets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receive_weather: () => dispatch({
      type: 'RECEIVE_WEATHER',
    }),
    haha: () => dispatch({
      type: 'GET_TWEETS',
    }),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Weather);

// export default Weather;
