import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import Weather from '../../components/Weather/Weather';
import Test from '../../components/Time/Test';
import { testPostDisplayRequest, testDisplayAction } from '../../actions/testActions';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   testDisplay: this.props.test.testState,
    // };
    this.getUpdatedDisplay = this.getUpdatedDisplay.bind(this);
    this.toUpdateDisplay = this.toUpdateDisplay.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(testDisplayAction());
    // console.log('_________________________ componentWillMount, testDisplayAction fired');
  }

  componentDidMount() {
    this.interval = setInterval(this.getUpdatedDisplay, 10000);
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
    console.log('************************** POSTED: ', bool);
  }

  render() {
    let testDisplayBoolFromStore = false;
    if (this.props.test.testState.displayBool !== undefined) {
      testDisplayBoolFromStore = this.props.test.testState.displayBool;
    }
    return (
      <Layout>
        <Time />
        <Weather />
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