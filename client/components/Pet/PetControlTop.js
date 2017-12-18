import React from 'react';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import CreatePet from './CreatePet';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');
const petStatus = fireUser.child('/pet/settings/status');

class PetControlTop extends React.Component {
  constructor(props) {
    super(props);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.state = { formVisibleOnPage: true };
  }

  componentDidMount() {
    petStatus.on('value', (snap) => {
      const currentPetStatus = snap.val();
      if (currentPetStatus === 'dead') {
        this.showForm();
      } else {
        this.hideForm();
      }
    });
  }

  componentWillUnmount() {
    petStatus.off();
  }

  showForm() {
    this.setState({ formVisibleOnPage: true });
  }

  hideForm() {
    this.setState({ formVisibleOnPage: false });
  }

  render() {
    const { formVisibleOnPage } = this.state;
    let formAreaContent = null;
    if (formVisibleOnPage) {
      formAreaContent = (
        <CreatePet
          addNewCreatureToPet={this.props.addNewCreatureToPet}
          hideFormAfterSubmission={this.hideForm}
        />
      );
    }

    return (
      <div className={s['center-align']}>
        {formAreaContent}
      </div>
    );
  }
}

PetControlTop.propTypes = {
  addNewCreatureToPet: PropTypes.func,
};

PetControlTop.defaultProps = {
  addNewCreatureToPet: null,
};

export default PetControlTop;
