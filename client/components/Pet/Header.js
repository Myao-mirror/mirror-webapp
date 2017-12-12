import React from 'react';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

function Header() {
  const imgStyle = {
    width: 200,
  };

  return (
    <div className={s['center-align']}>
      <h3>Pet Game!</h3>
      <p>Enter a name to create your pet. Feed, play and give it sleep. Do not let the score dip below 10 or it will die.</p>
      <img style={imgStyle} src="pusheen.png" alt="This is alt" />
    </div>
  );
}

export default Header;
