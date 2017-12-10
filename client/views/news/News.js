import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counter from '../../reducer';
import App from './App';
import Layout from '../../components/Layout';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
// import Materialize from '../../../node_modules/materialize-css/dist/css'
const store = createStore(counter);

class News extends React.Component {
  componentDidMount() {
    document.title = 'News';
  }

  render() {
    return (
      <Provider store={store}>
        <Layout>
          <div className={s.container}>
            <div className={s.row}>
              <div className={s.col}{...s.s6}>
                <h3 className={s.yellow}>About Mirror</h3>
                <p className={s.blue}>
                  <App />
                </p>
              </div>
            </div>

            <div className={s.col}{...s.s6}>
              <h3 className={s.yellow}>Mirror Stuff</h3>
              <p className={s.blue}>
                This mirror is the most awesome mirror ever.
              </p>
            </div>
          </div>
        </Layout>
      </Provider>
    );
  }
}

export default News;
