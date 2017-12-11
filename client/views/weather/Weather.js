import React from 'react';
import Layout from '../../components/Layout';
import Weather from '../../components/Weather/Weather';


class Landing extends React.Component {
  render() {
    return (
        <Layout>
              <Weather />
        </Layout>
    );
  }
}

export default Landing;
