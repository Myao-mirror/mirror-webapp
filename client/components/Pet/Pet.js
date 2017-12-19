import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PetControlTop from './PetControlTop';
import PetDetail from './PetDetail';
import store from '../../store';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

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
      3000,
    );
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

  updatePetLife() {
    const newMasterPet = this.state.masterPet.slice();
    newMasterPet.forEach(
      creature =>
        this.state.timeSinceBirth,
      this.setState({ masterPet: newMasterPet }),
    );
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
  store,
};

export default connect()(Pet);
