import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import PetModel from './PetModel';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import * as l from '../Layout/Layout.css';

const dbRoot = fire.database().ref().child('voice-pi');

class CreatePet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      timeSinceBirth: '',
      status: '',
    };
    this.preparePetCreation = this.preparePetCreation.bind(this);
    // Firebase DB connections
    this.username = '';
    this.fireUser = {};
    this.dbPetName = '';
    this.dbPetAge = '';
    // this.dbPetStatus = '';
    this.createPetName = '';
    this.createPetAge = '';
    this.petStatus = '';
  }

  componentDidMount() {
    this.username = this.props.username.username;
    this.fireUser = dbRoot.child(this.username);
    this.dbPetName = this.fireUser.child('/pet/settings/petName');
    this.dbPetAge = this.fireUser.child('/pet/settings/petAge');
    // this.dbPetStatus = this.fireUser.child('/pet/settings/status');

    this.dbPetAge.on('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      this.createPetAge = snap.val();
      console.log('Age updated: ' + this.createPetAge); // eslint-disable-line
    });

    // this.dbPetStatus.on('value', (snap) => {
    //   this.setState({
    //     status: snap.val(),
    //   });
    //   this.petStatus = snap.val();
    // });

    this.dbPetName.on('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      this.createPetName = snap.val();
      console.log('Name changed: ' + this.createPetName); // eslint-disable-line
      if (this.createPetName.length > 0) {
        // this.refs.value = this.createPetName;
        // this.preparePetCreation(event);
        const createPet = new PetModel(this.createPetName, this.username);
        createPet.createPet();
        this.props.addNewCreatureToPet(createPet);
        this.props.hideFormAfterSubmission();
        console.log(`Your new pet's name has been set to: ${this.createPetName}`);
        console.log(`Your new pet's age has been set to: ${this.createPetAge}`);
        // const createPetUpdate = {};
        // createPetUpdate['pet/settings/petName'] = this.createPetName;
        // createPetUpdate['pet/settings/petAge'] = this.createPetAge;
        // createPetUpdate['pet/settings/status'] = 'alive';
        // createPetUpdate['/pet/settings/active'] = true;
        // this.fireUser.update(createPetUpdate);
      }
    });
  }

  componentWillUnmount() {
    this.dbPetAge.off();
    this.dbPetName.off();
    // this.dbPetStatus.off();
  }

  preparePetCreation(event) {
    event.preventDefault();
    const { petName } = this.refs;
    const newPet = new PetModel(petName.value, this.username);
    newPet.createPet();
    this.props.addNewCreatureToPet(newPet);
    this.props.hideFormAfterSubmission();
    console.log(`The pet name has been set to: ${petName.value}`);
    console.log(`The pet's age has been updated to: ${newPet.timeSinceBirth}`);
    const preparePetUpdates = {};
    preparePetUpdates['pet/settings/petName'] = petName.value;
    preparePetUpdates['pet/settings/petAge'] = newPet.timeSinceBirth;
    preparePetUpdates['pet/settings/status'] = 'alive';
    preparePetUpdates['pet/settings/active'] = true;
    this.fireUser.update(preparePetUpdates);
  }

  render() {
    const createPetStyle = {
      margin: 'auto',
      fontWeight: 600,
      color: '#FFFFFF',
      // backgroundColor: '#000000',
    };
    return (
      <div className={[s.row, s['center-align']].join(' ')}>
        <div className={s.section} style={createPetStyle}>
          <h3>Myao Pet</h3>
          <div className={[s.card, s['white-text']].join(' ')}>
            <p className={[s['card-panel'], l['main-color-background'], s['lighten-4'], s['black-text']].join(' ')}>
              Enter a name to create your pet. Feed, work, play or make it go rest. Try not to let the health dip below 10 or it will die!
            </p>
          </div>
        </div>
        <div className={[s.card, s.black, s['white-text']].join(' ')} style={createPetStyle}>
          <form onSubmit={this.preparePetCreation} className={s['card-content']}>
            <div className={s['input-field']}>
              <input
                ref="petName"
                type="text"
                id="petName"
                defaultValue={this.createPetName}
                className={s['white-text']}
              />
            </div>
            <button className={[s.btn, s.white, s['black-text']].join(' ')} type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

CreatePet.propTypes = {
  addNewCreatureToPet: PropTypes.func,
  hideFormAfterSubmission: PropTypes.func,
  name: PropTypes.string,
  timeSinceBirth: PropTypes.string,
};

CreatePet.defaultProps = {
  addNewCreatureToPet: null,
  hideFormAfterSubmission: null,
  name: '',
  timeSinceBirth: '',
};

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(CreatePet);
