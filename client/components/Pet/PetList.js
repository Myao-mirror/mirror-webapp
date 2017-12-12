import React from 'react';
import PropTypes from 'prop-types';
import PetDetail from './PetDetail';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

function PetList(props) {
  console.log(props.creatures);
  return (
    <div className={[s.card, s.black, s['white-text']].join(' ')}>
      <div className={s['card-content']}>
        <h6>{props.creatures.map((creature, index) =>
          (<PetDetail
            name={creature.name}
            timeSinceBirth={creature.timeSinceBirth}
            life={creature.life}
            key={index}
          />))}
        </h6>
      </div>
    </div>
  );
}

PetList.propTypes = {
  creatures: PropTypes.array,
};

export default PetList;
