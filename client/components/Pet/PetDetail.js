import React from 'react';
import PropTypes from 'prop-types';
import PetDies from './PetDies';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

function PetDetail(props) {
  return (
    <div className={[s.card, s.black, s['white-text']].join(' ')}>
      <div className={s['card-content']}>
        <h6>Pet Name: {props.name}</h6>
        <h6>Time Since Birth: {props.timeSinceBirth}</h6>
        <h6><PetDies reduceLife={this.reduceLife} /></h6>
      </div>
    </div>
  );
}

PetDetail.propTypes = {
  name: PropTypes.string,
  timeSinceBirth: PropTypes.string,
  life: PropTypes.number,
  reduceLife: PropTypes.func,
};

export default PetDetail;
