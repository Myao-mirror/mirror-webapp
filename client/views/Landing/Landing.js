import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import Weather from '../../components/Weather/Weather';
import Test from '../../components/Time/Test';
import testDisplayAction from '../../actions/testActions';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   testDisplay: this.props.test.testState,
    // };
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(testDisplayAction());
    console.log('_________________________ componentWillMount, testDisplayAction fired');
  }

  componentDidMount() {
    this.interval = setInterval(this.updateDisplay, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateDisplay() {
    this.props.dispatch(testDisplayAction());
    console.log('TEST FIRED!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }

  render() {
    let testDisplayBoolFromStore = false;
    console.log('########################## 1testDisplayBoolFromStore: ', testDisplayBoolFromStore);
    if (this.props.test.testState.displayBool != undefined) {
      testDisplayBoolFromStore = this.props.test.testState.displayBool;
    }
    console.log('########################## testDisplayBoolFromStore: ', testDisplayBoolFromStore);
    return (
      <Layout>
        <Time />
        <Weather />
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
