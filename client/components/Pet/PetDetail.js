import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import PetHealth from './PetHealth';
import CreatePet from './CreatePet';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');
class PetDetail extends React.Component {
  constructor(props) {
    super(props);
    this.updateName = this.updateName.bind(this);
    this.updateAge = this.updateAge.bind(this);
    this.state = {
      name: CreatePet.name,
      timeSinceBirth: CreatePet.timeSinceBirth,
    };
    this.username = this.props.username.username;
    this.fireUser = dbRoot.child(this.username);
    this.currentPetName = this.state.name;
    this.currentTimeSinceBirth = this.state.timeSinceBirth;
    this.getPetStatus = this.fireUser.child('/pet/settings/status');
    this.getPetName = this.fireUser.child('/pet/settings/petName');
    this.getPetAge = this.fireUser.child('/pet/settings/petAge');
  }

  componentWillMount() {
    const findPetName = this.fireUser.child('/pet/settings/petName');
    findPetName.once('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      this.currentPetName = snap.val();
      console.log('Name discovered: ' + snap.val()); // eslint-disable-line
    });
    const findPetAge = this.fireUser.child('/pet/settings/petAge');
    findPetAge.once('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      this.currentTimeSinceBirth = snap.val();
      console.log('Age discovered: ' + snap.val()); // eslint-disable-line
    });
  }

  componentDidMount() {
    this.getPetName.on('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      this.currentPetName = snap.val();
      console.log('Name changed: ' + this.currentPetName); // eslint-disable-line
    });
    this.getPetAge.on('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      this.currentTimeSinceBirth = snap.val();
      console.log('Age changed: ' + this.currentTimeSinceBirth); // eslint-disable-line
    });
    this.getPetStatus.on('value', (snap) => {
      const currentPetStatus = snap.val();
      if (currentPetStatus === 'dead') {
        this.showForm();
      } else {
        this.hideForm();
      }
    });
  }

  componentWillUnmount() {
    this.setState({
      name: '',
      timeSinceBirth: null,
    });
    this.updateName();
    this.updateAge();
    this.getPetName.off();
    this.getPetAge.off();
    this.getPetStatus.off();
  }

  updateName() {
    const updateDbPetName = {};
    updateDbPetName['pet/settings/petName'] = this.state.name;
    this.fireUser.update(updateDbPetName);
  }
  updateAge() {
    const updateDbPetAge = {};
    updateDbPetAge['pet/settings/petAge'] = this.state.timeSinceBirth;
    this.fireUser.update(updateDbPetAge);
  }

  render() {
    return (
      <div className={[s.card, s.black, s['white-text']].join(' ')}>
        <div className={s['card-content']}>
          {/* <h6>Pet Name: {this.state.name}</h6>
          <h6>Time Since Birth: {currentTimeSinceBirth}</h6> */}
          <h6>Pet Name: {this.currentPetName}</h6>
          <h6>Time Since Birth: {this.currentTimeSinceBirth}</h6>
          <h6><PetHealth reduceLife={this.reduceLife} /></h6>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(PetDetail);
