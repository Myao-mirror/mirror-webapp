import React from 'react';
import Layout from '../../../components/Layout';
import Time from '../../../components/Time/Time';


class TimeDisplay extends React.Component {
  componentDidMount() {
    document.title = 'Time Display';
  }

  render() {
    return (
      <Layout>
        <Time />
      </Layout>
    );
  }
}

export default TimeDisplay;
