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
    this.props.dispatch(testDisplayAction(false));
    console.log('_________________________ componentWillMount, testDisplayAction fired');
  }

  componentDidMount() {
    this.interval = setInterval(this.updateDisplay, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateDisplay() {
    if (this.props.test.testState) {
      this.props.dispatch(testDisplayAction(false));
    } else {
      this.props.dispatch(testDisplayAction(true));
    }
    console.log('TEST FIRED!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  }

  render() {
    const testDisplayBoolFromStore = this.props.test.testState;
    console.log('########################## this.props.test.testState: ', this.props.test.testState);
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
