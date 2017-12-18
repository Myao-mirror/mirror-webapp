import React from 'react';
import { connect } from 'react-redux';
import fire from '../../utils/firebase/setup';

import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import News from '../../components/News/News';
import App from '../../components/Pet/PetComponent';
import Weather from '../../components/Weather/Weather';

const dbRoot = fire.database().ref().child('voice-pi');
// const fireUser = dbRoot.child('alice-kiwi');
// const newsActive = fireUser.child('/news/settings/active');
// const weatherActive = fireUser.child('/weather/settings/active');
// const petActive = fireUser.child('/pet/settings/active');
// const timeActive = fireUser.child('/time/settings/active');

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
    this.fireUser = {};
    this.newsActive = null;
    this.weatherActive = null;
    this.petActive = null;
    this.timeActive = null;
  }
  
  componentDidMount() {
    const username = this.props.route.params ? this.props.route.params.username : null;
    console.log('+++++++++++++++++++ username from store: ', this.props.username.username);
    // const rootRef = fire.database().ref().child('voice-pi');
    this.fireUser = dbRoot.child(username);
    this.newsActive = this.fireUser.child('/news/settings/active');
    this.weatherActive = this.fireUser.child('/weather/settings/active');
    this.petActive = this.fireUser.child('/pet/settings/active');
    this.timeActive = this.fireUser.child('/time/settings/active');

    const stringBoolMap = {
      false: false,
      true: true,
    };

    // "on" method sync data in realtime
    this.newsActive.on('value', (snap) => {
      this.setState({
        newsActive: stringBoolMap[snap.val()],
      });
    });
    this.weatherActive.on('value', (snap) => {
      this.setState({
        weatherActive: stringBoolMap[snap.val()],
      });
    });
    this.petActive.on('value', (snap) => {
      this.setState({
        petActive: stringBoolMap[snap.val()],
      });
    });
    this.timeActive.on('value', (snap) => {
      this.setState({
        timeActive: stringBoolMap[snap.val()],
      });
    });
  }

  componentWillUnmount() {
    this.newsActive.off();
    this.weatherActive.off();
    this.petActive.off();
    this.timeActive.off();
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

export default connect()(Landing);
