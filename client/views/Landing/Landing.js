import React from 'react';
import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import News from '../../components/News/News';
import Weather from '../../components/Weather/Weather';


class Landing extends React.Component {
  render() {
    return (
      <Layout>
        <Time />
        <News />
        <Weather />
      </Layout>
    );
  }
}

export default Landing;
