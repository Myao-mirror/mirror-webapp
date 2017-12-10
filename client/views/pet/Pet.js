import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counter from '../../reducer';
import Layout from '../../components/Layout';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
// import Materialize from '../../../node_modules/materialize-css/dist/css'

const store = createStore(counter);
// const quoteReceived = false;
// const giphyKey = '3oEduIQVh382PMPOfe';

// if (!window.location.hash) {
//   document.location += '#?';
// }

// const getQuote = function () {
//   $.ajax({
//     url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
//     type: 'GET', // The HTTP Method
//     datatype: 'json',
//     success(data) {
//       data = JSON.parse(data);
//       const quoteText = `${data.quote} - ${data.author}`;
//       $('#wrapQuote h1').text(quoteText);
//       const myURL = document.location;
//       document.location = `${myURL}&quote=${encodeURIComponent(quoteText)}`;
//     },
//     error(err) {
//       alert(err);
//     },
//     beforeSend(xhr) {
//       xhr.setRequestHeader('X-Mashape-Authorization', 'AvyK2kYttamsh0QVM9uxABW6aQUnp1awTxajsnLufhUW1PgjVz'); // Enter your Mashape key here
//     },
//   });
// };

// const getNewGif = function () {
//   $.ajax({
//     url: `http://api.giphy.com/v1/gifs/random?api_key=${giphyKey}&tag=reaction`, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
//     type: 'GET', // The HTTP Method
//     datatype: 'json',
//     success(data) {
//       $('#gif').attr('src', data.data.image_url);
//       const myURL = document.location;
//       document.location = `${myURL}&gif=${data.data.id}`;
//     },
//     error(err) {
//       alert(err);
//     },
//   });
// };

// const getExistingGif = function () {
//   $.ajax({
//     url: gifURL, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
//     type: 'GET', // The HTTP Method
//     datatype: 'json',
//     success(data) {
//       $('#gif').attr('src', data.data.images.original.url);
//     },
//     error(err) {
//       alert(err);
//     },
//   });
// };

// // Read a page's GET URL variables and return them as an associative array.
// function getUrlVars() {
//   let vars = [],
//     hash;
//   const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
//   for (let i = 0; i < hashes.length; i++) {
//     hash = hashes[i].split('=');
//     vars.push(hash[0]);
//     vars[hash[0]] = hash[1];
//   }
//   return vars;
// }

// const existingQuote = getUrlVars().quote;
// const existingGif = getUrlVars().gif;

// if (existingQuote) {
//   $('#wrapQuote h1').text(decodeURIComponent(existingQuote));
// } else {
//   getQuote();
// }

// if (existingGif) {
//   gifURL = `http://api.giphy.com/v1/gifs/${existingGif}?api_key=${giphyKey}`;
//   getExistingGif(gifURL);
// } else {
//   getNewGif();
// }

// $('#next, header > h1 > span').click(() => {
//   let currentURL = location.pathname;
//   currentURL = currentURL.substring(currentURL.length - 1) == '/' ? currentURL.substring(0, currentURL.length - 1) : currentURL;
//   currentURL.split('/').pop();
//   document.location = currentURL;
// });

// $('#share').click(() => {
//   const currentURL = document.location;
//   window.prompt('Copy to clipboard: Ctrl+C or CMD+C', currentURL);
// });

class Pet extends React.Component {
  componentDidMount() {
    document.title = 'Pet';
  }

  render() {
    return (
      <Provider store={store}>
        <Layout>
          <div className={s.container}>
            <div className={s.row}>
              <div className={s.col}{...s.s6}>
                <h3 className={s.yellow}>About Pets</h3>
                <p className={s.blue} />
              </div>
            </div>

            <div className={s.col}{...s.s6}>
              <h3 className={s.yellow}>Pet Stuff</h3>
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

Pet.propTypes = {
  quotes: PropTypes.array,
};

Pet.defaultProps = {
  quotes: [],
};

export default Pet;
