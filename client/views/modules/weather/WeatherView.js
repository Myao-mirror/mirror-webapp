import React from 'react';
import Layout from '../../../components/Layout';
import Weather from '../../../components/Weather/Weather';

class WeatherView extends React.Component {
  render() {
    return (
      <Layout>
        <Weather />
      </Layout>
    );
  }
}

export default WeatherView;
