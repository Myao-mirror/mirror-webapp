import React from 'react';
import { connect } from 'react-redux';

import fire from '../../Firebase/setup';

import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import News from '../../components/News/News';
import App from '../../components/Pet/PetComponent';
import Weather from '../../components/Weather/Weather';

// TODO: get rid of all the test
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsActive: false,
      petActive: false,
      timeActive: true,
      weatherActive: false,
    };
  }

  componentDidMount() {
    const rootRef = fire.database().ref().child('voice-pi');
    const fireUser = rootRef.child('lola-banana');
    const newsActive = fireUser.child('/news/settings/active');
    const weatherActive = fireUser.child('/weather/settings/active');
    const petActive = fireUser.child('/pet/settings/active');
    const timeActive = fireUser.child('/time/settings/active');

    const stringBoolMap = {
      false: false,
      true: true,
    };

    // "on" method sync data in realtime
    newsActive.on('value', (snap) => {
      this.setState({
        newsActive: stringBoolMap[snap.val()],
      });
    });
    weatherActive.on('value', (snap) => {
      console.log('WEATHER STATE: ', this.state.weatherActive);
      console.log('weather snap: ', snap.val());
      this.setState({
        weatherActive: stringBoolMap[snap.val()],
      });
    });
    petActive.on('value', (snap) => {
      this.setState({
        petActive: stringBoolMap[snap.val()],
      });
    });
    timeActive.on('value', (snap) => {
      this.setState({
        timeActive: stringBoolMap[snap.val()],
      });
    });
  }

  render() {
    return (
      <Layout>
        { this.state.timeActive ? <Time /> : null }
        { this.state.newsActive ? <News /> : null }
        { this.state.petActive ? <App /> : null }
        { this.state.weatherActive ? <Weather /> : null }
      </Layout>
    );
  }
}

export default Landing;
