import PropTypes from 'prop-types';
import React from 'react';
import history from '../../history';
import Link from '../../components/Link';
import s from './ErrorPage.css';

class ErrorPage extends React.Component {

  static propTypes = {
    error: PropTypes.object,
  };

  componentDidMount() {
    document.title = this.props.error && this.props.error.status === 404 ?
      'Page Not Found' : 'Error';
  }

  goBack = event => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    // eslint-disable-next-line no-console
    if (this.props.error && console.error) console.error(this.props.error);

    const [code, title] = this.props.error && this.props.error.status === 404 ?
      ['404', 'Page not found'] :
      ['Error', 'Oups, something went wrong'];

    return (
      <div className={s.container}>
        <main className={s.content}>
          <h1 className={s.code}>{code}</h1>
          <p className={s.title}>{title}</p>
          {code === '404' && <p className={s.text}>
            The page you are looking for does not exist or an another error occurred.
          </p>}
          <p className={s.text}>
            <a href="/" onClick={this.goBack}>Go back</a>, or head over to the&nbsp;
            <Link to="/">home page</Link> to choose a new direction.
          </p>
        </main>
      </div>
    );
  }
}

export default ErrorPage;
