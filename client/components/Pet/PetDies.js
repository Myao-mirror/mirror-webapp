import React from 'react';
import PropTypes from 'prop-types';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';

class PetDies extends React.Component {
  constructor(props) {
    super(props);
    this.addRest = this.addRest.bind(this);
    this.addPlay = this.addPlay.bind(this);
    this.addFood = this.addFood.bind(this);
    this.reduceLife = this.reduceLife.bind(this);
    this.state = {
      life: 100,
    };
  }

  componentDidMount() {
    this.life = setInterval(() =>
      this.reduceLife(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.life);
    alert('Sorry your pet has died');
  }

  reduceLife() {
    console.log('Life reduced');
    const newLife = this.state.life - 5;
    console.log(newLife);
    this.setState({ life: newLife });
    if (newLife < 0) {
      this.componentWillUnmount();
    }
  }

  addFood(event) {
    const newFood = this.state.life + 5;
    console.log('Food clicked');
    this.setState({ life: newFood });
  }

  addRest(event) {
    const newRest = this.state.life + 10;
    console.log('Rest clicked');
    this.setState({ life: newRest });
  }

  addPlay(event) {
    const newPlay = this.state.life + 3;
    console.log('Play clicked');
    this.setState({ life: newPlay });
  }

  render() {
    return (
      <div className={[s.card, s.black, s['white-text']].join(' ')}>
        <div className={[s['card-content'], s['center-align']].join(' ')}>
          <div className={[s.section, s.row].join(' ')}>
            <span className={s['card-title']}>Life: {this.state.life}</span>
          </div>
          <div className={[s.section, s.row].join(' ')}>
            <div className={[s.col, s.s4].join(' ')}>
              <button onClick={this.addFood} className={s.btn}>Feed me!</button>
            </div>
            <div className={[s.col, s.s4].join(' ')}>
              <button onClick={this.addRest} className={s.btn}>Sleep</button>
            </div>
            <div className={[s.col, s.s4].join(' ')}>
              <button onClick={this.addPlay} className={s.btn}>Play!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PetDies.propTypes = {
  componentDidMount: PropTypes.func,
  life: PropTypes.number,
  reduceLife: PropTypes.func,
  name: PropTypes.string,
  addFood: PropTypes.func,
};

export default PetDies;
