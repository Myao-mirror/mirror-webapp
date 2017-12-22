import React from 'react';
import { connect } from 'react-redux';
import fire from '../../utils/firebase/setup';
import PetHealth from './PetHealth';
// import CreatePet from './CreatePet';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');

class PetDetail extends React.Component {
  constructor(props) {
    super(props);
    // this.updateName = this.updateName.bind(this);
    // this.updateAge = this.updateAge.bind(this);
    this.state = {
      name: '',
      timeSinceBirth: '',
    };
    // this.currentPetName = this.state.name;
    // this.currentTimeSinceBirth = this.state.timeSinceBirth;
    this.username = '';
    this.fireUser = {};
    this.getPetName = '';
    this.getPetAge = '';
  }

  componentDidMount() {
    this.username = this.props.username.username;
    this.fireUser = dbRoot.child(this.username);
    // this.getPetStatus = this.fireUser.child('/pet/settings/status');
    this.getPetName = this.fireUser.child('/pet/settings/petName');
    this.getPetAge = this.fireUser.child('/pet/settings/petAge');
    // Listeners for DB changes
    this.getPetName.on('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      console.log('Name changed: ' + this.state.name); // eslint-disable-line
    });
    this.getPetAge.on('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      console.log('Age changed: ' + this.state.timeSinceBirth); // eslint-disable-line
    });
  }

  componentWillUnmount() {
    this.getPetName.off();
    this.getPetAge.off();
  }

  // updateName() {
  //   const updateDbPetName = {};
  //   updateDbPetName['pet/settings/petName'] = this.state.name;
  //   this.fireUser.update(updateDbPetName);
  // }
  // updateAge() {
  //   const updateDbPetAge = {};
  //   updateDbPetAge['pet/settings/petAge'] = this.state.timeSinceBirth;
  //   this.fireUser.update(updateDbPetAge);
  // }

  render() {
    return (
      <div className={[s.section, s.transparent, s['white-text']].join(' ')}>
        <div className={s['card-content']}>
          {/* <h6>Pet Name: {this.state.name}</h6>
          <h6>Time Since Birth: {currentTimeSinceBirth}</h6> */}
          <h6>Pet Name: {this.state.name}</h6>
          <h6>Time Since Birth: {this.state.timeSinceBirth}</h6>
          {/* <h6><PetHealth reduceLife={this.reduceLife} /></h6> */}
          <h6><PetHealth /></h6>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(PetDetail);
