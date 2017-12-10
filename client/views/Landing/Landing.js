import React from 'react';
import Layout from '../../components/Layout';
import Time from '../../components/Time/Time';
import News from '../../components/News/News';


class Landing extends React.Component {
  render() {
    return (
        <Layout>
              <Time />
              <News />
        </Layout>
    );
  }
}

export default Landing;
