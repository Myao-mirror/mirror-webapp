import React from 'react';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import * as Materialize from '../../../node_modules/materialize-css/dist/js/materialize.min';
import MaterialIcon from '../../../node_modules/react-google-material-icons';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');

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
      restCount: 0,
      playCount: 0,
      workCount: 0,
      foodCount: 0,
    };
  }

  componentDidMount() {
    console.log('PetHealth dbRoot: ' + dbRoot); // eslint-disable-line
    console.log('PetHealth fireUser: ' + fireUser); // eslint-disable-line
    const restCount = fireUser.child('/pet/settings/actions/rest/count');
    const playCount = fireUser.child('/pet/settings/actions/play/count');
    const workCount = fireUser.child('/pet/settings/actions/work/count');
    const foodCount = fireUser.child('/pet/settings/actions/food/count');

    this.life = setInterval(() =>
      this.reduceLife(), 10000);

    // "on" method sync data in realtime
    restCount.on('value', (snap) => {
      this.setState({
        restCount: snap.val(),
      });
      console.log('Rest count: ' + snap.val()); // eslint-disable-line
    });
    playCount.on('value', (snap) => {
      this.setState({
        playCount: snap.val(),
      });
      console.log('Play count: ' + snap.val()); // eslint-disable-line
    });
    workCount.on('value', (snap) => {
      this.setState({
        workCount: snap.val(),
      });
      console.log('Work count: ' + snap.val()); // eslint-disable-line
    });
    foodCount.on('value', (snap) => {
      this.setState({
        foodCount: snap.val(),
      });
      console.log('Food count: ' + snap.val()); // eslint-disable-line
    });
  }

  componentWillUnmount() {
    clearInterval(this.life);
    alert('Sorry your pet has died'); // TODO: Replace alert with toast or otherwise remove
    Materialize.toast('I am a toast A VERY BIG TOAST!!', 4000); // TODO: Either make work or remove
    const clearLife = this.state.life - (this.state.life);
    this.setState({
      life: clearLife,
      image: 'dojodachiDead.gif',
    });

    // // Reset firebase count
    // const restUpdate = {};
    // const newRestCount = fire.database().ref(`/voice-pi/${fireUser}/pet/settings/rest/count`);
    // newRestCount.on('value', (snap) => {
    //   snap.val();
    //   restUpdate['/pet/settings/rest/count'] = snap.val() + (-snap.val());
    //   fireUser.update(restUpdate);
    //   console.log('Rest count: ' + snap.val()); // eslint-disable-line
    // });
  }

  reduceLife() {
    console.log('Life reduced'); // eslint-disable-line
    const newLife = this.state.life - 5;
    console.log(newLife); // eslint-disable-line
    this.setState({ life: newLife });
    if (newLife < 0) {
      this.componentWillUnmount();
    }
  }

  addFood(event) {
    console.log(event); // eslint-disable-line
    const newFoodGif = 'dojodachiEating.gif';
    const newFood = this.state.life + 5;
    console.log('Food clicked'); // eslint-disable-line
    this.setState({
      life: newFood,
      image: newFoodGif,
      foodCount: this.foodCount += 1,
    });
  }

  addRest(event) {
    console.log(event); // eslint-disable-line
    const newRestGif = 'dojodachiSleeping.gif';
    const newRest = this.state.life + 10;
    console.log('Rest clicked'); // eslint-disable-line
    this.setState({
      life: newRest,
      image: newRestGif,
      restCount: this.restCount += 1,
    });
  }

  addWork(event) {
    console.log(event); // eslint-disable-line
    const newWorkGif = 'dojodachiWorking.gif';
    const newWork = this.state.life - 3;
    console.log('Work clicked'); // eslint-disable-line
    this.setState({
      life: newWork,
      image: newWorkGif,
      workCount: this.workCount += 1,
    });
  }

  addPlay(event) {
    console.log(event); // eslint-disable-line
    const newPlayGif = 'dojodachiPlaying.gif';
    const newPlay = this.state.life + 3;
    console.log('Play clicked'); // eslint-disable-line
    this.setState({
      life: newPlay,
      image: newPlayGif,
      playCount: this.playCount += 1,
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
  life: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  reduceLife: PropTypes.func,
  restCount: PropTypes.number,
  playCount: PropTypes.number,
  workCount: PropTypes.number,
  foodCount: PropTypes.number,
};

PetHealth.defaultProps = {
  life: 100,
  image: '',
  name: '',
  reduceLife: null,
  restCount: 0,
  playCount: 0,
  workCount: 0,
  foodCount: 0,
};

export default PetHealth;
