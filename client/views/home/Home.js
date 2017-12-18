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
        {/* <p>
          For more information visit <a href={link1}>{link1}</a>.
        </p> */}
        <Username />
        {/* <h1>Featured Technologies</h1>
        <ul>
          {this.props.articles.map((article, i) => (
            <li key={i}>
              <span>
                <a href={article.url}>
                  {article.title}
                </a> [{article.author}]
              </span>
              <ul>
                {article.includes.map((product, n) => (
                  <li key={n}>
                    <span>
                      <a href={product.url}>
                        {product.title}
                      </a> [{product.author}]
                    </span>
                  </li>))}
              </ul>
            </li>))
          }
        </ul> */}
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
