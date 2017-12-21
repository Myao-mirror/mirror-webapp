import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import PetControlTop from './PetControlTop';
import PetDetail from './PetDetail';
// import PetModel from './PetModel';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');

class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterPet: [],
    };
    this.addNewCreatureToPet = this.addNewCreatureToPet.bind(this);
    // this.updatePetLife = this.updatePetLife.bind(this);
    this.username = '';
    this.fireUser = {};
    this.petStatus = null;
  }

  componentDidMount() {
    this.username = this.props.username.username;
    this.fireUser = dbRoot.child(this.username);
    this.petStatus = this.fireUser.child('/pet/settings/status');
    this.petStatus.on('value', (snap) => {
      const currentPetStatus = snap.val();
      if (currentPetStatus === 'dead') {
        const removeMasterPet = this.state.masterPet.slice();
        removeMasterPet.pop();
        this.setState({
          masterPet: removeMasterPet,
        });
      }
      // else {
      //   this.timeSinceBirth = setInterval(
      //     () =>
      //       this.updatePetLife(),
      //     6000,
      //   );
      // }
    });
  }

  // componentWillUnmount() {
  //   clearInterval(this.timeSinceBirth);
  // }

  addNewCreatureToPet(newPet) {
    const newMasterPet = this.state.masterPet.slice();
    newMasterPet.pop();
    newMasterPet.push(newPet);
    this.setState({
      masterPet: newMasterPet,
    });
    console.log('~~~~~ masterpet', this.state.masterPet); // eslint-disable-line
  }

  // updatePetLife() {
  //   const newMasterPet = this.state.masterPet.slice();
  //   newMasterPet.forEach(
  //     creature =>
  //       this.state.timeSinceBirth,
  //     this.setState({ masterPet: newMasterPet }),
  //   );
  //   if ((typeof this.state.life === 'number') && this.state.life > -5) {
  //     const updateLifeVal = {};
  //     updateLifeVal['pet/settings/life'] = this.state.life;
  //     this.fireUser.update(updateLifeVal);
  //   } else {
  //     this.componentWillUnmount();
  //   }
  // }

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
    <div className={[s.section, s.transparent, s['white-text']].join(' ')}>
      <div className={s['card-content']}>
        <h6>{props.creatures.map((creature, index) =>
          (<PetDetail key={index} />))}
          {/* name={creature.name}
            timeSinceBirth={creature.timeSinceBirth}
            life={creature.life}
            image={creature.image}
            key={index} // eslint-disable-line
          /> */}
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

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(Pet);
