import React from 'react';
// import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import PetHealth from './PetHealth';
import CreatePet from './CreatePet';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');
let currentPetName = '';
let currentTimeSinceBirth = '';
const getPetName = fireUser.child('/pet/settings/petName');
const getPetAge = fireUser.child('/pet/settings/petAge');
// const petStatus = fireUser.child('/pet/settings/status');

class PetDetail extends React.Component {
  constructor(props) {
    super(props);
    // this.updateName = this.updateName.bind(this);
    this.updateAge = this.updateAge.bind(this);
    this.state = {
      name: CreatePet.name,
      timeSinceBirth: CreatePet.timeSinceBirth,
    };
    currentTimeSinceBirth = this.state.timeSinceBirth;
  }

  componentWillMount() {
    const findPetName = fireUser.child('/pet/settings/petName');
    findPetName.once('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      currentPetName = snap.val();
      console.log('Name discovered: ' + snap.val()); // eslint-disable-line
    });
    const findPetAge = fireUser.child('/pet/settings/petAge');
    findPetAge.once('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      currentTimeSinceBirth = snap.val();
      console.log('Age discovered: ' + snap.val()); // eslint-disable-line
    });
  }

  componentDidMount() {
    getPetName.on('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      currentPetName = snap.val();
      console.log('Name changed: ' + currentPetName); // eslint-disable-line
    });
    getPetAge.on('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      currentTimeSinceBirth = snap.val();
      console.log('Age changed: ' + currentTimeSinceBirth); // eslint-disable-line
    });
    // petStatus.on('value', (snap) => {
    //   const currentPetStatus = snap.val();
    //   if (currentPetStatus === 'dead') {
    //     this.showForm();
    //   } else {
    //     this.hideForm();
    //   }
    // });
  }

  componentWillUnmount() {
    this.setState({
      name: '',
      timeSinceBirth: null,
    });
    // this.updateName();
    this.updateAge();
    getPetName.off();
    getPetAge.off();
  }

  // updateName() {
  //   const updateDbPetName = {};
  //   updateDbPetName['pet/settings/petName'] = this.state.name;
  //   fireUser.update(updateDbPetName);
  // }

  updateAge() {
    const updateDbPetAge = {};
    updateDbPetAge['pet/settings/petAge'] = this.state.timeSinceBirth;
    fireUser.update(updateDbPetAge);
  }

  render() {
    return (
      <div className={[s.card, s.black, s['white-text']].join(' ')}>
        <div className={s['card-content']}>
          <h6>Pet Name: {this.state.name}</h6>
          <h6>Time Since Birth: {currentTimeSinceBirth}</h6>
          <h6><PetHealth reduceLife={this.reduceLife} /></h6>
        </div>
      </div>
    );
  }
}

export default PetDetail;
