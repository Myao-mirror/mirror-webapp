import React from 'react';
import { connect } from 'react-redux';
import fire from '../../utils/setup';
import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import News from '../../components/News/News';
import App from '../../components/Pet/PetComponent';
import Weather from '../../components/Weather/Weather';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsActive: true,
    };
  }

  componentDidMount() {
    const rootRef = fire.database().ref().child('voice-pi');
    const defaultUser = rootRef.child('admin-apple');
    const newsActive = defaultUser.child('news').child('settings').child('active');

    newsActive.on('value', (changeSetting) => {
      console.log('Fire: ', changeSetting);
      this.setState({
        newsActive: changeSetting.val(),
      });
    });
  }

  render() {
    return (
      <Layout>
        <Time />
        {this.state.newsActive ? <News /> : null }
        <App />
        <Weather />
      </Layout>
    );
  }
}

export default Landing;
