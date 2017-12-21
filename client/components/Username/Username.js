import React from 'react';
import { connect } from 'react-redux';
import fire from '../../utils/firebase/setup';

import Link from '../Link';
import { usernameSubmit, checkIfExist } from '../../actions/usernameActions';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import * as l from '../Layout/Layout.css';

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.onUsernameInput = this.onUsernameInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.rootRef = fire.database().ref().child('voice-pi');
  }

  onUsernameInput(event) {
    event.preventDefault();
    // TODO: clear localStorage on input, then line 132 code block won't show
    localStorage.clear();
    this.props.dispatch(usernameSubmit(
      this._fname.value.toLowerCase(), // eslint-disable-line
      this._fruit.value.toLowerCase(), // eslint-disable-line
    ));
    const username = `${this._fname.value}-${this._fruit.value}`;  // eslint-disable-line
    if (username) {
      this.rootRef.child(username).on('value', (snap) => {
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
    // save username to localStorage so that the mirror remembers the user
    const fname = this.props.username.fname;
    const fruit = this.props.username.fruit;
    const username = this.props.username.username;
    localStorage.setItem('username', username);
    localStorage.setItem('fname', fname);
    localStorage.setItem('fruit', fruit);
 
    // TODO: this set up the account for user, and we don't need
    // if (!this.props.username.exist && this.props.username.username) {
    //   this.rootRef.child(username).set({
    //     news: { settings: { active: true } },
    //     time: { settings: { active: true } },
    //     weather: { settings: { active: true } },
    //     pet: {
    //       settings: {
    //         active: true,
    //         life: 0,
    //         petName: '',
    //         petAge: '',
    //         status: 'dead',
    //       },
    //     },
    //   });
    // }
  }

  render() {
    const inputStyle = {
      color: '#00FFFF',
      backgroundColor: '#000000',
    };

    // // bool to disable button
    // let bool = true;
    // try {
    //   bool = (!this._fname.value || !this._fruit.value); // eslint-disable-line
    // } catch (e) { }

    let placeholderFname = '';
    let placeholderFruit = '';
    let lsUsername = '';
    let routeFromLS = '';
    const routeFromState = `/landing/${this.props.username.username}`;

    try {
      placeholderFname = localStorage.getItem('fname');
      placeholderFruit = localStorage.getItem('fruit');
      lsUsername = localStorage.getItem('username');
      routeFromLS = `/landing/${lsUsername}`;
    } catch (e) {
      placeholderFname = 'Your first name';
      placeholderFruit = 'Your favorite fruit';
    }

    return (
      <div className={[s.row, s['center-align']].join(' ')}>
        <div className={s.section}>
          <div className={[s.card, s.black].join(' ')}>
            <p className={[s['card-panel'], l['main-color-background'], s['lighten-4'], s['black-text']].join(' ')}>
              If this is your first time using your Myao Mirror, please speak to your mirror assistant to set up an account to begin.
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
                    ref={(input) => { this._fname = input; }} // eslint-disable-line
                    type="text"
                    id="fname"
                    placeholder={placeholderFname}
                    onChange={this.onUsernameInput}
                  />
                </div>
                <div className={[s['input-field'], s.col, s.m6].join(' ')}>
                  <input
                    style={inputStyle}
                    ref={(input) => { this._fruit = input; }} // eslint-disable-line
                    type="text"
                    id="fruit"
                    placeholder={placeholderFruit}
                    onChange={this.onUsernameInput}
                  />
                </div>
              </div>

              {/* see if localStorage has username */}
              {lsUsername ?
                <div>
                  <h5>Is your username &nbsp;<strong>"{lsUsername}"</strong>?<br /></h5>
                  <p className={s.center}>If not, please enter the username assigned by your voice assistant.</p>
                  <button
                    onClick={this.handleClick}
                    className={[s.btn, s.yellow].join(' ')}
                  >
                    <Link to={routeFromLS} className={s['white-text']}><span className={s['black-text']}>See My Myao Mirror</span></Link>
                  </button>
                </div> : <h5>Your username should look like this:<br />

                  <strong>"{ this.props.username.username }"</strong>
                </h5>}

              {/* username valid, display link to take user to landing */}
              {(this.props.username.exist && !lsUsername) ?
                <div>
                  <p
                    className={[s.center, s['green-text']].join(' ')}
                  >
                    We found your account!
                  </p>
                  <button
                    onClick={this.handleClick}
                    className={[s.btn, s.yellow].join(' ')}
                  >
                    <Link to={routeFromState} className={s['white-text']}><span className={s['black-text']}>See My Myao Mirror</span></Link>
                  </button>
                </div> : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(Username);
