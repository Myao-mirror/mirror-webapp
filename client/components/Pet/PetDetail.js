import React from 'react';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import PetHealth from './PetHealth';
import CreatePet from './CreatePet';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');
let currentPetName = '';
let currentTimeSinceBirth = '';

class PetDetail extends React.Component {
// function PetDetail(props) {
  constructor(props) {
    super(props);
    this.updateName = this.updateName.bind(this);
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
    const getPetName = fireUser.child('/pet/settings/petName');
    getPetName.on('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      currentPetName = snap.val();
      console.log('Name changed: ' + currentPetName); // eslint-disable-line
    });
    const getPetAge = fireUser.child('/pet/settings/petAge');
    getPetAge.on('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      currentTimeSinceBirth = snap.val();
      console.log('Age changed: ' + currentTimeSinceBirth); // eslint-disable-line
    });
  }

  componentWillUnmount() {
    this.setState({
      name: '',
      timeSinceBirth: null,
    });
    this.updateName();
    this.updateAge();
  }

  updateName() {
    const updateDbPetName = {};
    updateDbPetName['pet/settings/petName'] = this.state.name;
    fireUser.update(updateDbPetName);
  }

  updateAge() {
    const updateDbPetAge = {};
    updateDbPetAge['pet/settings/petAge'] = this.state.timeSinceBirth;
    fireUser.update(updateDbPetAge);
  }

  render() {
    return (
      <div className={[s.card, s.black, s['white-text']].join(' ')}>
        <div className={s['card-content']}>
          <h6>Pet Name: {currentPetName}</h6>
          <h6>Time Since Birth: {currentTimeSinceBirth}</h6>
          <h6><PetHealth reduceLife={this.reduceLife} /></h6>
        </div>
      </div>
    );
  }
}

// PetDetail.propTypes = {
//   name: PropTypes.string,
//   timeSinceBirth: PropTypes.string,
//   life: PropTypes.number,
//   reduceLife: PropTypes.func,
// };

// PetDetail.defaultProps = {
//   name: '',
//   timeSinceBirth: '',
//   life: 0,
//   reduceLife: null,
// };

export default PetDetail;
