import React from 'react';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import PetControlTop from './PetControlTop';
import PetDetail from './PetDetail';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');
const petStatus = fireUser.child('/pet/settings/status');

class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterPet: [],
    };
    this.addNewCreatureToPet = this.addNewCreatureToPet.bind(this);
    this.updatePetLife = this.updatePetLife.bind(this);
  }

  componentDidMount() {
    petStatus.on('value', (snap) => {
      const currentPetStatus = snap.val();
      if (currentPetStatus === 'dead') {
        const removeMasterPet = this.state.masterPet.slice();
        removeMasterPet.pop();
      } else {
        this.timeSinceBirth = setInterval(
          () =>
            this.updatePetLife(),
          3000,
        );
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timeSinceBirth);
  }

  addNewCreatureToPet(newPet) {
    const newMasterPet = this.state.masterPet.slice();
    newMasterPet.pop();
    newMasterPet.push(newPet);
    this.setState({ masterPet: newMasterPet });
    console.log(this.state.masterPet); // eslint-disable-line
  }

  // updatePetLife() {
  //   const newMasterPet = this.state.masterPet.slice();
  //   newMasterPet.length = 1;
  //   newMasterPet.forEach(
  //     creature =>
  //       this.state.timeSinceBirth,
  //     this.setState({ masterPet: newMasterPet }),
  //   );
  // }

  updatePetLife() {
    const newMasterPet = this.state.masterPet.slice();
    newMasterPet.forEach(
      creature =>
        this.state.timeSinceBirth,
      this.setState({ masterPet: newMasterPet }),
    );
    if ((typeof this.state.life === 'number') && this.state.life > 0) {
      const updateLifeVal = {};
      updateLifeVal['pet/settings/life'] = this.state.life;
      fireUser.update(updateLifeVal);
    } else {
      this.componentWillUnmount();
    }
  }

  render() {
    return (
      <div>
        <PetControlTop addNewCreatureToPet={this.addNewCreatureToPet} />
        <PetList
          creatures={this.state.masterPet}
        />
      </div>
    );
  }
}

function PetList(props) {
  console.log(props.creatures); // eslint-disable-line
  return (
    <div className={[s.card, s.black, s['white-text']].join(' ')}>
      <div className={s['card-content']}>
        <h6>{props.creatures.map((creature, index) =>
          (<PetDetail
            name={creature.name}
            timeSinceBirth={creature.timeSinceBirth}
            life={creature.life}
            image={creature.image}
            key={index} // eslint-disable-line
          />))}
        </h6>
      </div>
    </div>
  );
}

PetList.propTypes = {
  creatures: PropTypes.arrayOf(PropTypes.object),
};

PetList.defaultProps = {
  creatures: [],
};

Pet.propTypes = {
  addNewCreatureToPet: PropTypes.func,
};

Pet.defaultProps = {
  addNewCreatureToPet: null,
};

export default Pet;
