import React from 'react';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';
import fire from '../../utils/firebase/setup';
import { usernameSubmit } from '../../actions/usernameActions';
import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import News from '../../components/News/News';
import Pet from '../../components/Pet/Pet';
import Weather from '../../components/Weather/Weather';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import * as l from '../../components/Layout/Layout.css';

// Set the root of the DB
const dbRoot = fire.database().ref().child('voice-pi');
const stringBoolMap = {
  false: false,
  true: true,
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsActive: true,
      petActive: true,
      timeActive: true,
      weatherActive: true,
    };
    this.fireUser = {};
    this.newsActive = null;
    this.weatherActive = null;
    this.petActive = null;
    this.timeActive = null;
  }

  componentWillMount() {
    const username = this.props.route.params.username;
    const distructUsername = username.split('-');
    // Save username in store in case store doesn't have it already. When user directly put landing/<username>, without going thru the home page, the store won't have user info.
    this.props.dispatch(usernameSubmit(distructUsername[0], distructUsername[1]));
  }

  componentDidMount() {
    const username = this.props.route.params.username;
    this.fireUser = dbRoot.child(username);
    this.newsActive = this.fireUser.child('/news/settings/active');
    this.weatherActive = this.fireUser.child('/weather/settings/active');
    this.petActive = this.fireUser.child('/pet/settings/active');
    this.timeActive = this.fireUser.child('/time/settings/active');

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
      // <Layout>
      //   {/* { this.state.timeActive ? <Rnd className={[s.hoverable, s['center-align'], s.panel, l.component].join(' ')}><Time /></Rnd> : null } */}
      //   {/* { this.state.timeActive ? <Rnd default={{ x: 0, y: 0, width: '30%', height: '10%', }} className={[s.hoverable, s['center-align'], s.panel, l.component].join(' ')}><Time /></Rnd> : null } */}
      //   { this.state.timeActive ? <Rnd default={{ x: 0, y: 0, width: '700', height: '20%', }}><Time /></Rnd> : null }
      //   { this.state.newsActive ? <Rnd className={[s.hoverable, s['center-align'], s.panel, l.component].join(' ')}><News /></Rnd> : null }
      //   { this.state.petActive ? <Rnd className={[s.hoverable, s['center-align'], s.panel, l.component].join(' ')}><Pet /></Rnd> : null }
      //   { this.state.weatherActive ? <Rnd className={[s.hoverable, s['center-align'], s.panel, l.component].join(' ')}><Weather /></Rnd> : null }
      // </Layout>
      <Layout>
          { this.state.newsActive ?
            <Rnd className={[l['upper-left'], s['center-align']].join(' ')} default={{ x: 0,
                                                                                       y: 0,
                                                                                       width: '50%',
                                                                                       height: '100%' }}>
              <News />
            </Rnd> : null }
          <section className={l.section}>
          { this.state.timeActive ?
            <Rnd className={[l['upper-right'], s['center-align']].join(' ')} default={{ x: 500,
                                                                                        y: 0,
                                                                                        width: '50%',
                                                                                        height: 160 }}>
              <Time />
            </Rnd> : null }
          { this.state.weatherActive ?
            <Rnd className={[l['middle-right'], s['center-align']].join(' ')} default={{ x: 500,
                                                                                         y: 160,
                                                                                         width: '50%',
                                                                                         height: 200 }}>
              <Weather />
            </Rnd> : null }
          { this.state.petActive ?
            <Rnd className={[l['bottom-right'], s['center-align']].join(' ')} default={{ x: 500,
                                                                                         y: 450,
                                                                                         width: '50%',
                                                                                         height: 'auto' }}>
              <Pet />
            </Rnd> : null }
          </section>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(Landing);
