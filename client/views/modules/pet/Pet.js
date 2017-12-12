// import { Provider } from 'react-redux';
import React from 'react';
import Counter from '../../../components/PetComp/Counter';
import Layout from '../../../components/Layout';
// import store from '../../../store';

class PetDisplay extends React.Component {
  render() {
    return (
      <Layout>
        <Counter />
      </Layout>
    );
  }
}

export default PetDisplay;
