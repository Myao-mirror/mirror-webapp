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
      fireNews: false,
    };
  }

  componentDidMount() {
    const rootRef = fire.database().ref().child('animal-knowledge');
    const fireUser = rootRef.child('lola');
    const userNews = fireUser.child('news');
    // "on" method sync data in realtime
    userNews.on('value', (snap) => {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FIRE: ', snap);
      this.setState({
        fireNews: snap.val(),
      });
    });
  }

  render() {
    return (
      <Layout>
        <Time />
        { this.state.fireNews ? <News /> : null }
        <App />
        <Weather />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test,
});
export default connect(mapStateToProps)(Landing);
