import React from 'react';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import PetModel from './PetModel';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');
let createPetName = '';
let createPetAge = '';

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
    const dbPetName = fireUser.child('/pet/settings/petName');
    const dbPetAge = fireUser.child('/pet/settings/petAge');
    dbPetName.on('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      createPetName = snap.val();
      console.log('Name changed: ' + snap.val()); // eslint-disable-line
    });
    dbPetAge.on('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      createPetAge = snap.val();
      console.log('Age updated: ' + snap.val()); // eslint-disable-line
    });
  }

  preparePetCreation(event) {
    event.preventDefault();
    const { petName } = this.refs;
    const newPet = new PetModel(petName.value);
    this.props.addNewCreatureToPet(newPet);
    this.props.hideFormAfterSubmission();
    console.log(`The pet name has been set to: ${petName.value}`);
    console.log(`The pet's age has been updated to: ${createPetAge}`);
    const updates = {};
    updates['pet/settings/petName'] = petName.value;
    updates['pet/settings/petAge'] = createPetAge;
    updates['pet/settings/status'] = 'alive';
    fireUser.update(updates);
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

export default CreatePet;
