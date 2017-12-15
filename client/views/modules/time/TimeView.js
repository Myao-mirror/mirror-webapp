import React from 'react';
import Layout from '../../../components/Layout';
import Time from '../../../components/Time/Time';

class TimeView extends React.Component {
  componentDidMount() {
    document.title = 'Time View';
  }

  render() {
    return (
      <Layout>
        <Time />
      </Layout>
    );
  }
}

export default TimeView;
