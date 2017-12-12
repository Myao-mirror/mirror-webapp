import React from 'react';
import PropTypes from 'prop-types';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import * as Materialize from '../../../node_modules/materialize-css/dist/js/materialize.min';
import MaterialIcon from '../../../node_modules/react-google-material-icons';

class PetHealth extends React.Component {
  constructor(props) {
    super(props);
    this.addRest = this.addRest.bind(this);
    this.addPlay = this.addPlay.bind(this);
    this.addWork = this.addWork.bind(this);
    this.addFood = this.addFood.bind(this);
    this.reduceLife = this.reduceLife.bind(this);
    this.state = {
      life: 100,
      image: 'dojodachiIdling.gif',
    };
  }

  componentDidMount() {
    this.life = setInterval(() =>
      this.reduceLife(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.life);
    this.state = {
      life: 0,
      image: 'dojodachiDead.gif',
    };
    Materialize.toast('I am a toast A VERY BIG TOAST!!', 4000);
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
    const newFoodGif = 'dojodachiEating.gif';
    const newFood = this.state.life + 5;
    console.log('Food clicked');
    this.setState({
      life: newFood,
      image: newFoodGif,
    });
  }

  addRest(event) {
    const newRestGif = 'dojodachiSleeping.gif';
    const newRest = this.state.life + 10;
    console.log('Rest clicked');
    this.setState({
      life: newRest,
      image: newRestGif,
    });
  }

  addWork(event) {
    const newWorkGif = 'dojodachiWorking.gif';
    const newWork = this.state.life - 3;
    console.log('Work clicked');
    this.setState({
      life: newWork,
      image: newWorkGif,
    });
  }

  addPlay(event) {
    const newPlayGif = 'dojodachiPlaying.gif';
    const newPlay = this.state.life + 3;
    console.log('Play clicked');
    this.setState({
      life: newPlay,
      image: newPlayGif,
    });
  }

  render() {
    const imgStyle = {
      width: 200,
    };
    return (
      <div className={[s.card, s.black, s['white-text'], s['center-align']].join(' ')}>
        <img style={imgStyle} src={this.state.image} alt="This is alt" />
        <div className={s['card-content']}>
          <div className={[s.section, s.row].join(' ')}>
            <span className={s['red-text']}><MaterialIcon icon="favorite" size={16} /></span> {this.state.life}
          </div>
          <div className={[s.section, s.row].join(' ')}>
            <div className={[s.col, s.s3].join(' ')}>
              <button onClick={this.addFood} className={[s.btn, s.white, s['black-text']].join(' ')}>Eat!</button>
            </div>
            <div className={[s.col, s.s3].join(' ')}>
              <button onClick={this.addRest} className={[s.btn, s.white, s['black-text']].join(' ')}>Sleep!</button>
            </div>
            <div className={[s.col, s.s3].join(' ')}>
              <button onClick={this.addWork} className={[s.btn, s.white, s['black-text']].join(' ')}>Work!</button>
            </div>
            <div className={[s.col, s.s3].join(' ')}>
              <button onClick={this.addPlay} className={[s.btn, s.white, s['black-text']].join(' ')}>Play!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PetHealth.propTypes = {
  componentDidMount: PropTypes.func,
  life: PropTypes.number,
  image: PropTypes.string,
  reduceLife: PropTypes.func,
  name: PropTypes.string,
  addFood: PropTypes.func,
};

export default PetHealth;
