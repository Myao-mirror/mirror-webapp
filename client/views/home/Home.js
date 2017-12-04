import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../../components/Layout';

const title = 'Maki Roggers Portfolio';
const link1 = 'https://makiroggers.com';
const link2 = 'https://github.com/makiroggers';

class Home extends React.Component {
  static propTypes = {
    articles: PropTypes.any.isRequired,
  };

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
              For more information visit <a href={link1}>{link1}</a> or <a href={link2}>{link2}</a>.
            </p>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <h1 className="mdl-typography--title">Featured Technologies</h1>
            <ul>
              {this.props.articles.map((article, i) => <li key={i}>
                  <span className="mdl-typography--menu">
                    <a href={article.url} className="mdl-typography--font-bold">
                      {article.title}
                    </a> [{article.author}]
                  </span>
                  <ul>
                    {article.includes.map((product, n) => <li key={n}>
                      <span className="mdl-typography--menu mdl-typography--font-thin">
                        <a href={product.url}>
                          {product.title}
                        </a> [{product.author}]
                      </span>
                    </li>)}
                  </ul>
              </li>)}
            </ul>
            <p />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
