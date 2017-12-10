import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';

const title = 'Myao Mirror';
const link1 = 'https://github.com/Myao-mirror';

class Home extends React.Component {
  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col">
            <h1 className="mdl-typography--title">Welcome to {title}!</h1>
            <p className="mdl-typography--body-1">
              For more information visit <a href={link1}>{link1}</a>.
            </p>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <h1 className="mdl-typography--title">Featured Technologies</h1>
            <ul>
              {this.props.articles.map((article, i) => (
                <li key={i}>
                  <span className="mdl-typography--menu">
                    <a href={article.url} className="mdl-typography--font-bold">
                      {article.title}
                    </a> [{article.author}]
                  </span>
                  <ul>
                    {article.includes.map((product, n) => (
                      <li key={n}>
                        <span className="mdl-typography--menu mdl-typography--font-thin">
                          <a href={product.url}>
                            {product.title}
                          </a> [{product.author}]
                        </span>
                      </li>))}
                  </ul>
                </li>))
              }
            </ul>
            <p />
          </div>
        </div>
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
