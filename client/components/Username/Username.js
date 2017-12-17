import React from 'react';
import { connect } from 'react-redux';
import fire from '../../utils/firebase/setup';

import Link from '../Link';
import { usernameSubmit, checkIfExist } from '../../actions/usernameActions';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.setUsername = this.setUsername.bind(this);
  }

  componentDidMount() {

  }

  setUsername(event) {
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

  render() {
    const inputStyle = {
      color: '#00FFFF',
      backgroundColor: '#000000',
    };
    let bool = false;
    try {
      bool = (!this._fname.value || !this._fruit.value);
    } catch (e) {
      console.log(e);
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
            <form onSubmit={this.setUsername} className={s['card-content']}>
              <div className={s.row}>
                <div className={[s['input-field'], s.col, s.m6].join(' ')}>
                  <input
                    style={inputStyle}
                    ref={(input) => { this._fname = input; }}
                    type="text"
                    id="fname"
                    placeholder="your first name"
                    onChange={this.setUsername}
                  />
                </div>
                <div className={[s['input-field'], s.col, s.m6].join(' ')}>
                  <input
                    style={inputStyle}
                    ref={(input) => { this._fruit = input; }}
                    type="text"
                    id="fruit"
                    placeholder="your favortite fruit"
                    onChange={this.setUsername}
                  />
                </div>
              </div>
              <h4>Your username looks like this:<br />
                <strong>"{ this.props.username.username }"</strong>
              </h4>
              {this.props.username.exist ? <h5>Oh uh, this username is taken!</h5> : null }
              {this.props.username.exist ? <Link to="/landing" >TAKE ME TO MIRROR!</Link> : null}
              {this.props.username.exist ? null :
              <button
                className={[s.btn]}
                type="submit"
                disabled={bool}
              >
                SET USERNAME
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
