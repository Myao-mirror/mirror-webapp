import React from 'react';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import PetModel from './PetModel';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');
let createPetName = '';
let createPetAge = '';
const dbPetName = fireUser.child('/pet/settings/petName');
const dbPetAge = fireUser.child('/pet/settings/petAge');

class CreatePet extends React.Component {
  constructor(props) {
    super(props);
    this.preparePetCreation = this.preparePetCreation.bind(this);
    this.state = {
      name: '',
      timeSinceBirth: '',
    };
  }

  componentDidMount() {
    dbPetAge.on('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      createPetAge = snap.val();
      console.log('Age updated: ' + createPetAge); // eslint-disable-line
    });
    dbPetName.on('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      createPetName = snap.val();
      console.log('Name changed: ' + createPetName); // eslint-disable-line
      if (createPetName.length > 2) {
        const createPet = new PetModel(createPetName);
        this.props.addNewCreatureToPet(createPet);
        this.props.hideFormAfterSubmission();
        console.log(`Your new pet's name has been set to: ${createPetName}`);
        console.log(`Your new pet's age has been set to: ${createPetAge}`);
        const createPetUpdate = {};
        createPetUpdate['pet/settings/petAge'] = createPetAge;
        createPetUpdate['pet/settings/status'] = 'alive';
        createPetUpdate['/pet/settings/active'] = true;
        fireUser.update(createPetUpdate);
      }
    });
  }

  componentWillUnmount() {
    dbPetAge.off();
    dbPetName.off();
  }

  preparePetCreation(event) {
    event.preventDefault();
    const { petName } = this.refs;
    const newPet = new PetModel(petName.value);
    this.props.addNewCreatureToPet(newPet);
    this.props.hideFormAfterSubmission();
    console.log(`The pet name has been set to: ${petName.value}`);
    console.log(`The pet's age has been updated to: ${createPetAge}`);
    const preparePetUpdates = {};
    preparePetUpdates['pet/settings/petName'] = petName.value;
    preparePetUpdates['pet/settings/petAge'] = createPetAge;
    preparePetUpdates['pet/settings/status'] = 'alive';
    preparePetUpdates['pet/settings/active'] = true;
    fireUser.update(preparePetUpdates);
  }

  render() {
    const createPetStyle = {
      maxWidth: '60%',
      margin: 'auto',
      fontWeight: 600,
      color: '#FFFFFF',
      backgroundColor: '#000000',
    };
    return (
      <div className={[s.row, s['center-align']].join(' ')}>
        <div className={s.section} style={createPetStyle}>
          <h3>Myao Pet</h3>
          <div className={[s.card, s.black, s['white-text']].join(' ')}>
            <p className={[s['card-panel'], s.purple, s['lighten-4'], s['black-text']].join(' ')}>
              Enter a name to create your pet. Feed, work, play or allow it to sleep. Do not let the score dip below 10 or it will die!
            </p>
          </div>
        </div>
        <div className={s.section} style={createPetStyle}>
          <div className={[s.card, s.black, s['white-text']].join(' ')}>
            <form onSubmit={this.preparePetCreation} className={s['card-content']}>
              <div className={s['input-field']}>
                <input
                  ref="petName"
                  type="text"
                  id="petName"
                  defaultValue={createPetName}
                  className={s['white-text']}
                />
              </div>
              <button className={[s.btn, s.white, s['black-text']].join(' ')} type="submit">Submit</button>
            </form>
          </div>
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

export default CreatePet;
