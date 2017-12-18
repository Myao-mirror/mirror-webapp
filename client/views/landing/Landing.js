import React from 'react';
import fire from '../../utils/firebase/setup';

import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import News from '../../components/News/News';
import App from '../../components/Pet/PetComponent';
import Weather from '../../components/Weather/Weather';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');
const newsActive = fireUser.child('/news/settings/active');
const weatherActive = fireUser.child('/weather/settings/active');
const petActive = fireUser.child('/pet/settings/active');
const timeActive = fireUser.child('/time/settings/active');

const stringBoolMap = {
  false: false,
  true: true,
};

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
    // "on" method sync data in realtime
    newsActive.on('value', (snap) => {
      this.setState({
        newsActive: stringBoolMap[snap.val()],
      });
    });
    weatherActive.on('value', (snap) => {
      console.log('WEATHER STATE: ', this.state.weatherActive); // eslint-disable-line
      console.log('weather snap: ', snap.val()); // eslint-disable-line
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

  componentWillUnmount() {
    newsActive.off();
    weatherActive.off();
    petActive.off();
    timeActive.off();
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
