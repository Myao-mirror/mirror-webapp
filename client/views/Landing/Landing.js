import React from 'react';
import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import Weather from '../../components/Weather/Weather';


function Landing() {
  return (
    <Layout>
      <Time />
      <Weather />
    </Layout>
  );
}

export default Landing;
