import React from 'react';
import Layout from '../../components/Layout';

class About extends React.Component {
  componentDidMount() {
    document.title = 'About Mirror';
  }

  render() {
    return (
      <Layout>
        <h1>About Mirror</h1>
        <p>
          Coming soon.
        </p>
        <h1>Mirror Stuff</h1>
        <p>
          This mirror is the most awesome mirror ever.
        </p>
      </Layout>
    );
  }
}

export default About;
