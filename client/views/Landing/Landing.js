import React from 'react';
import { connect } from 'react-redux';
// import * as firebase from 'firebase';
import fire from '../../Firebase/setup';

import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import News from '../../components/News/News';
import App from '../../components/Pet/PetComponent';
import Weather from '../../components/Weather/Weather';
import Test from '../../components/Time/Test';
import { testPostDisplayRequest, testDisplayAction } from '../../actions/testActions';

// TODO: get rid of all the test
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fireNews: false,
    };
    this.getUpdatedDisplay = this.getUpdatedDisplay.bind(this);
    this.toUpdateDisplay = this.toUpdateDisplay.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(testDisplayAction());
  }

  componentDidMount() {
    this.interval = setInterval(this.getUpdatedDisplay, 10000);
    const rootRef = fire.database().ref().child('animal-knowledge');
    const fireUser = rootRef.child('lola');
    const userNews = fireUser.child('news');
    // on method sync data in realtime
    userNews.on('value', (snap) => {
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FIRE: ', snap);
      this.setState({
        fireNews: snap.val(),
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getUpdatedDisplay() {
    this.props.dispatch(testDisplayAction());
    // console.log('TEST FIRED!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }

  toUpdateDisplay() {
    let bool = true;
    if (this.props.test.testState.displayBool !== undefined) {
      bool = !this.props.test.testState.displayBool;
    }
    this.props.dispatch(testPostDisplayRequest(bool));
  }

  render() {
    let testDisplayBoolFromStore = false;
    if (this.props.test.testState.displayBool !== undefined) {
      testDisplayBoolFromStore = this.props.test.testState.displayBool;
    }
    return (
      <Layout>
        <Time />
        { this.state.fireNews ? <News /> : null }
        <App />
        <Weather />
        {/* <h1>fireData is: {this.state.fireData.news}</h1> */}
        <button onClick={this.toUpdateDisplay}>Toggle Test Component</button>
        <h4>testDisplayBoolFromStore: {testDisplayBoolFromStore.toString()}</h4>
        {testDisplayBoolFromStore ? <Test /> : null}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test,
});
export default connect(mapStateToProps)(Landing);
