import React from 'react';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import PetControlTop from './PetControlTop';
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

  componentWillMount() {
    const setStatus = {};
    setStatus['pet/settings/status'] = 'alive';
    fireUser.update(setStatus);
  }

  componentDidMount() {
    const restCount = fireUser.child('/pet/actions/rest/count');
    const playCount = fireUser.child('/pet/actions/play/count');
    const workCount = fireUser.child('/pet/actions/work/count');
    const foodCount = fireUser.child('/pet/actions/food/count');
    const petName = fireUser.child('/pet/settings/petName');
    const petAge = fireUser.child('/pet/settings/petAge');

    this.life = setInterval(() =>
      this.reduceLife(), 30000);

    // "on" method sync data in realtime
    petName.on('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      console.log('Name changed: ' + snap.val()); // eslint-disable-line
    });
    petAge.on('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      console.log('Age updated: ' + snap.val()); // eslint-disable-line
    });
    restCount.on('value', (snap) => {
      this.setState({
        restCount: snap.val(),
      });
      console.log('Rest count: ' + snap.val()); // eslint-disable-line
      this.addRest(snap);
    });
    playCount.on('value', (snap) => {
      this.setState({
        playCount: snap.val(),
      });
      console.log('Play count: ' + snap.val()); // eslint-disable-line
      this.addPlay(snap);
    });
    workCount.on('value', (snap) => {
      this.setState({
        workCount: snap.val(),
      });
      console.log('Work count: ' + snap.val()); // eslint-disable-line
      this.addWork(snap);
    });
    foodCount.on('value', (snap) => {
      this.setState({
        foodCount: snap.val(),
      });
      console.log('Food count: ' + snap.val()); // eslint-disable-line
      this.addFood(snap);
    });
  }

  componentWillUnmount() {
    clearInterval(this.life);
    alert('Sorry your pet has died'); // TODO: Replace alert with toast or otherwise remove
    Materialize.toast('I am a toast A VERY BIG TOAST!!', 4000); // TODO: Either make work or remove
    const clearLife = this.state.life - (this.state.life);
    // PetControlTop.setState({
    //   formVisibleOnPage: true,
    // });
    this.setState({
      life: clearLife,
      name: '',
      timeSinceBirth: '',
      image: 'dojodachiDead.gif',
      restCount: 0,
      playCount: 0,
      workCount: 0,
      foodCount: 0,
    });

    const updatePetInfo = {};
    updatePetInfo['pet/actions/rest/count'] = 0;
    updatePetInfo['pet/actions/play/count'] = 0;
    updatePetInfo['pet/actions/work/count'] = 0;
    updatePetInfo['pet/actions/food/count'] = 0;
    updatePetInfo['pet/settings/status'] = 'dead';
    updatePetInfo['pet/settings/petAge'] = '';
    fireUser.update(updatePetInfo);
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
  life: PropTypes.number, // eslint-disable-line
  image: PropTypes.string, // eslint-disable-line
  name: PropTypes.string, // eslint-disable-line
  timeSinceBirth: PropTypes.string, // es-lint-disable-line
  reduceLife: PropTypes.func, // eslint-disable-line
  restCount: PropTypes.number, // eslint-disable-line
  playCount: PropTypes.number, // eslint-disable-line
  workCount: PropTypes.number, // eslint-disable-line
  foodCount: PropTypes.number, // eslint-disable-line
};

PetHealth.defaultProps = {
  life: 100,
  image: '',
  name: '',
  timeSinceBirth: '',
  reduceLife: null,
  restCount: 0,
  playCount: 0,
  workCount: 0,
  foodCount: 0,
};

export default PetHealth;
