import React from 'react';
import PropTypes from 'prop-types';
import PetModel from './PetModel';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class CreatePet extends React.Component {
  constructor(props) {
    super(props);
    this.preparePetCreation = this.preparePetCreation.bind(this);
  }

  preparePetCreation(event) {
    event.preventDefault();
    const { petName } = this.refs;
    const newPet = new PetModel(petName.value);
    this.props.addNewCreatureToPet(newPet);
    this.props.hideFormAfterSubmission();
    console.log(newPet.petName);
  }

  render() {
    const createPetStyle = {
      maxWidth: '50vw',
      fontWeight: 600,
      margin: '0 22% auto auto',
    };
    return (
      <div className={[s.card, s.lime].join(' ')} style={createPetStyle}>
        <form onSubmit={this.preparePetCreation} className={s['card-content']}>
          <div className={s['input-field']}>
            <input
              ref="petName"
              type="text"
              id="petName"
              placeholder=""
              className={s['black-text']}
            />
          </div>
          <button className={s.btn} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

CreatePet.propTypes = {
  addNewCreatureToPet: PropTypes.func,
  hideFormAfterSubmission: PropTypes.func,
};

export default CreatePet;
