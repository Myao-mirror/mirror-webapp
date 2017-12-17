import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import usernameSubmit from '../../actions/usernameActions';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.setUsername = this.setUsername.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  setUsername(event) {
    event.preventDefault();
    this.props.dispatch(usernameSubmit(
      this._fname.value.toLowerCase(),
      this._fruit.value.toLowerCase(),
    ));
    console.log(`**************** USERNAME: ${this._fname.value}-${this._fruit.value}`);
  }

  render() {
    const inputStyle = {
      color: '#00FFFF',
      backgroundColor: '#000000',
    };
    return (
      <div className={[s.row, s['center-align']].join(' ')}>
        <div className={s.section}>
          <h4>Hey, Myao Mirror is here. Did you talk to your mirror assistant about your username?</h4>
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
              <h4>Your username looks like this:&nbsp;
                <strong>"{ this.props.username.username }"</strong>
              </h4>
              <button className={[s.btn, s['black-text']].join(' ')} type="submit">SET USERNAME</button>
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
