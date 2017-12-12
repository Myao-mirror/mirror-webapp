import React from 'react';
import PropTypes from 'prop-types';
import PetControlTop from './PetControlTop';
import PetList from './PetList';

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
    this.timeSinceBirth = setInterval(
      () =>
        this.updatePetLife(),
      5000,
    );
  }

  addNewCreatureToPet(newPet) {
    const newMasterPet = this.state.masterPet.slice();
    newMasterPet.push(newPet);
    this.setState({ masterPet: newMasterPet });
    console.log(this.state.masterPet);
  }

  updatePetLife() {
    const newMasterPet = this.state.masterPet.slice();
    newMasterPet.forEach(creature =>
      creature.setTimeSinceBirth());
    this.setState({ masterPet: newMasterPet });
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

Pet.propTypes = {
  addNewCreatureToPet: PropTypes.func,
};

export default Pet;
