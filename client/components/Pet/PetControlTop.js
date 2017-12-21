import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import CreatePet from './CreatePet';
// import PetModel from './PetModel';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

const dbRoot = fire.database().ref().child('voice-pi');

class PetControlTop extends React.Component {
  constructor(props) {
    super(props);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.state = { formVisibleOnPage: true };
    this.username = '';
    this.petStatus = '';
    this.petLife = '';
    this.petAge = '';
    // this.name = '';
    // this.life = 0;
    // this.age = '';
  }

  componentDidMount() {
    this.username = this.props.username.username;
    this.fireUser = dbRoot.child(this.username);
    this.petStatus = this.fireUser.child('/pet/settings/status');
    this.petStatus.on('value', (snap) => {
      const currentPetStatus = snap.val();
      if (currentPetStatus === 'dead') {
        this.showForm();
      } else {
        this.hideForm();
      }
    });
  }

  componentWillUnmount() {
    this.petStatus.off();
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

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(PetControlTop);
