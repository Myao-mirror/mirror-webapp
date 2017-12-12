import React from 'react';
import PropTypes from 'prop-types';
import CreatePet from './CreatePet';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class PetControlTop extends React.Component {
  constructor(props) {
    super(props);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.state = { formVisibleOnPage: false };
  }

  showForm() {
    this.setState({ formVisibleOnPage: true });
  }

  hideForm() {
    this.setState({ formVisibleOnPage: false });
  }

  render() {
    const formVisibleOnPage = this.state.formVisibleOnPage;
    let formAreaContent = null;
    if (this.state.formVisibleOnPage) {
      formAreaContent = (<CreatePet
        addNewCreatureToPet={this.props.addNewCreatureToPet}
        hideFormAfterSubmission={this.hideForm}
      />);
    } else {
      formAreaContent = <button onClick={this.showForm.bind(this)} className={s.btn}>New Pet</button>;
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

export default PetControlTop;
