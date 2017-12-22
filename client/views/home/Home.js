import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import Username from '../../components/Username/Username';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const title = 'Myao Mirror';
const link1 = 'https://github.com/Myao-mirror';

class Home extends React.Component {
  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout>
        <h2 className={[s['white-text'], s['center-align']].join(' ')}>Welcome to your {title}!</h2>
        <Username />
      </Layout>
    );
  }
}

Home.propTypes = {
  articles: PropTypes.array,
};

Home.defaultProps = {
  articles: [],
};

export default Home;
