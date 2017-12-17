import React from 'react';
import { connect } from 'react-redux';
import fire from '../../utils/firebase/setup';

import Link from '../Link';
import { usernameSubmit, checkIfExist } from '../../actions/usernameActions';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.onUsernameInput = this.onUsernameInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onUsernameInput(event) {
    event.preventDefault();
    this.props.dispatch(usernameSubmit(
      this._fname.value.toLowerCase(),
      this._fruit.value.toLowerCase(),
    ));
    const rootRef = fire.database().ref().child('voice-pi');
    const username = `${this._fname.value}-${this._fruit.value}`;
    if (username) {
      console.log('____________________USERNAME for FIRE: ', username);
      rootRef.child(username).on('value', (snap) => {
        const userData = snap.val();
        if (userData) {
          this.props.dispatch(checkIfExist(true));
        } else {
          this.props.dispatch(checkIfExist(false));
        }
      });
    }
  }

  handleClick(event) {
    event.preventDefault();
    const fname = this.props.username.fname;
    const fruit = this.props.username.fruit;
    const username = this.props.username.username;
    localStorage.setItem('username', username);
    localStorage.setItem('fname', fname);
    localStorage.setItem('fruit', fruit);
  }

  render() {
    const inputStyle = {
      color: '#00FFFF',
      backgroundColor: '#000000',
    };

    // bool to disable button
    let bool = false;
    try {
      bool = (!this._fname.value || !this._fruit.value);
    } catch (e) {
      console.log(e);
    }

    let placeholderFname = '';
    let placeholderFruit = '';
    let lsUsername = '';

    try {
      placeholderFname = localStorage.getItem('fname');
      placeholderFruit = localStorage.getItem('fruit');
      lsUsername = localStorage.getItem('username');
    } catch (e) {
      placeholderFname = 'your first name';
      placeholderFruit = 'your favortite fruit';
    }

    return (
      <div className={[s.row, s['center-align']].join(' ')}>
        <div className={s.section}>
          <h4>Did you talk to your mirror assistant about your username?</h4>
          <div className={[s.card, s.black].join(' ')}>
            <p className={[s['card-panel'], s.purple, s['lighten-4'], s['black-text']].join(' ')}>
              If it's your first time using Myao Mirror, please talk to your mirror assistant to set up your username.
            </p>
          </div>
        </div>
        <div className={s.section}>
          <div className={[s.card, s.black].join(' ')}>
            <form className={s['card-content']}>
              <div className={s.row}>
                <div className={[s['input-field'], s.col, s.m6].join(' ')}>
                  <input
                    style={inputStyle}
                    ref={(input) => { this._fname = input; }}
                    type="text"
                    id="fname"
                    placeholder={placeholderFname}
                    onChange={this.onUsernameInput}
                  />
                </div>
                <div className={[s['input-field'], s.col, s.m6].join(' ')}>
                  <input
                    style={inputStyle}
                    ref={(input) => { this._fruit = input; }}
                    type="text"
                    id="fruit"
                    placeholder={placeholderFruit}
                    onChange={this.onUsernameInput}
                  />
                </div>
              </div>
              {lsUsername ? 
                <div>
                  <h4>is this you?&nbsp;<strong>"{lsUsername}"</strong><br /></h4>
                  <p className={s.center}>Not you? change it up there!</p>
                </div> : null}
              <h4>Your username looks like this:<br />
                <strong>"{ this.props.username.username }"</strong>
              </h4>

              {this.props.username.exist ? <h5>Oh uh, this username is taken!</h5> : null }
              {this.props.username.exist ? <Link to="/landing" >TAKE ME TO MIRROR!</Link> : null}
              {this.props.username.exist ? null :
              <button
                onClick={this.handleClick}
                className={[s.btn]}
                type="submit"
                disabled={bool}
              >
                <Link to="/landing" >SET USERNAME</Link>

              </button>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Username.propTypes = {
//   addNewCreatureToPet: PropTypes.func,
//   hideFormAfterSubmission: PropTypes.func,
// };
const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(Username);
