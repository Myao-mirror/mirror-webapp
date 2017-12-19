import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fire from '../../utils/firebase/setup';
import * as s from '../../../node_modules/materialize-css/dist/css/materialize.min.css';
import * as Materialize from '../../../node_modules/materialize-css/dist/js/materialize.min';
import MaterialIcon from '../../../node_modules/react-google-material-icons';

const dbRoot = fire.database().ref().child('voice-pi');

class PetHealth extends React.Component {
  constructor(props) {
    super(props);
    this.addRest = this.addRest.bind(this);
    this.addPlay = this.addPlay.bind(this);
    this.addWork = this.addWork.bind(this);
    this.addFood = this.addFood.bind(this);
    this.reduceLife = this.reduceLife.bind(this);
    this.updatePetLife = this.updatePetLife.bind(this);
    this.state = {
      image: '/dojodachiIdling.gif',
      restCount: 0,
      playCount: 0,
      workCount: 0,
      foodCount: 0,
      life: 0,
    };
    this.username = '';
    this.fireUser = {};
    this.restCount = null;
    this.playCount = null;
    this.workCount = null;
    this.foodCount = null;
    this.petName = null;
    this.petLife = null;
    this.petAge = null;
  }

  componentWillMount() {
    this.username = this.props.username.username;
  }

  componentDidMount() {
    this.life = setInterval(() =>
      this.reduceLife(), 5000);
    this.fireUser = dbRoot.child(this.username);
    this.restCount = this.fireUser.child('/pet/actions/rest/count');
    this.playCount = this.fireUser.child('/pet/actions/play/count');
    this.workCount = this.fireUser.child('/pet/actions/work/count');
    this.foodCount = this.fireUser.child('/pet/actions/food/count');
    this.petName = this.fireUser.child('/pet/settings/petName');
    this.petLife = this.fireUser.child('/pet/settings/life');
    this.petAge = this.fireUser.child('/pet/settings/petAge');

    // "on" method sync data in realtime
    this.petName.on('value', (snap) => {
      this.setState({
        name: snap.val(),
      });
      console.log('Name updated: ' + snap.val()); // eslint-disable-line
    });

    this.petLife.on('value', (snap) => {
      this.setState({
        life: snap.val(),
      });
      console.log('Life updated: ' + snap.val()); // eslint-disable-line
    });

    this.petAge.on('value', (snap) => {
      this.setState({
        timeSinceBirth: snap.val(),
      });
      console.log('Age updated: ' + snap.val()); // eslint-disable-line
    });

    this.restCount.on('value', (snap) => {
      const currentRestCount = snap.val();
      if (currentRestCount !== 0) {
        this.setState({
          restCount: currentRestCount,
        });
        console.log('Rest count: ' + currentRestCount); // eslint-disable-line
        this.addRest(snap);
      }
    });

    this.playCount.on('value', (snap) => {
      const currentPlayCount = snap.val();
      if (currentPlayCount !== 0) {
        this.setState({
          playCount: currentPlayCount,
        });
        console.log('Play count: ' + currentPlayCount); // eslint-disable-line
        this.addPlay(snap);
      }
    });

    this.workCount.on('value', (snap) => {
      const currentWorkCount = snap.val();
      if (currentWorkCount !== 0) {
        this.setState({
          workCount: currentWorkCount,
        });
        console.log('Work count: ' + currentWorkCount); // eslint-disable-line
        this.addWork(snap);
      }
    });

    this.foodCount.on('value', (snap) => {
      const currentFoodCount = snap.val();
      if (currentFoodCount !== 0) {
        this.setState({
          foodCount: currentFoodCount,
        });
        console.log('Food count: ' + currentFoodCount); // eslint-disable-line
        this.addFood(snap);
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.life);
    this.foodCount.off();
    this.workCount.off();
    this.playCount.off();
    this.restCount.off();
    this.petAge.off();
    this.petLife.off();
    this.petName.off();
    const updatePetInfo = {};
    if (this.state.life < 10) {
      this.setState({
        life: 0,
        name: '',
        timeSinceBirth: '',
        image: '/dojodachiDead.gif',
        restCount: 0,
        playCount: 0,
        workCount: 0,
        foodCount: 0,
      });
      updatePetInfo['pet/settings/status'] = 'dead';
    } else {
      updatePetInfo['pet/settings/status'] = 'alive';
    }
    console.log('++++++++++++++++++++++ PLAYCOUNT: ', this.state.playCount);
    updatePetInfo['pet/actions/rest/count'] = this.state.restCount;
    updatePetInfo['pet/actions/play/count'] = this.state.playCount;
    updatePetInfo['pet/actions/work/count'] = this.state.workCount;
    updatePetInfo['pet/actions/food/count'] = this.state.foodCount;
    updatePetInfo['pet/settings/life'] = this.state.life;
    updatePetInfo['pet/settings/petName'] = this.state.name;
    updatePetInfo['pet/settings/petAge'] = this.state.timeSinceBirth;
    this.fireUser.update(updatePetInfo);
    // alert('Sorry your pet has died'); // TODO: Replace alert with toast or otherwise remove
    Materialize.toast('I am a toast A VERY BIG TOAST!!', 4000); // TODO: Either make work or remove
  }

  updatePetLife() {
    if ((typeof this.state.life === 'number') && this.state.life > 0) {
      const updateLifeVal = {};
      updateLifeVal['pet/settings/life'] = this.state.life;
      this.fireUser.update(updateLifeVal);
    } else {
      const dbPetLife = this.fireUser.child('/pet/settings/life');
      dbPetLife.once('value', (snap) => {
        this.setState({
          life: snap.val(),
        });
        console.log('Life updated: ' + this.state.life); // eslint-disable-line
      });
    }
  }

  reduceLife() {
    console.log('Life reduced'); // eslint-disable-line
    const newLife = this.state.life - 5;
    console.log(newLife); // eslint-disable-line
    this.setState({ life: newLife });
    this.updatePetLife();
    if (newLife < 0) {
      this.componentWillUnmount();
    }
  }

  addFood(event) {
    console.log(event); // eslint-disable-line
    const newFoodGif = '/dojodachiEating.gif';
    const newFood = this.state.life + 5;
    console.log('Food clicked'); // eslint-disable-line
    this.setState({
      life: newFood,
      image: newFoodGif,
      foodCount: this.state.foodCount += 1,
    });
    this.updatePetLife();
  }

  addRest(event) {
    console.log(event); // eslint-disable-line
    const newRestGif = '/dojodachiSleeping.gif';
    const newRest = this.state.life + 10;
    console.log('Rest clicked'); // eslint-disable-line
    this.setState({
      life: newRest,
      image: newRestGif,
      restCount: this.state.restCount += 1,
    });
    this.updatePetLife();
  }

  addWork(event) {
    console.log(event); // eslint-disable-line
    const newWorkGif = '/dojodachiWorking.gif';
    const newWork = this.state.life - 3;
    console.log('Work clicked'); // eslint-disable-line
    this.setState({
      life: newWork,
      image: newWorkGif,
      workCount: this.state.workCount += 1,
    });
    this.updatePetLife();
  }

  addPlay(event) {
    console.log(event); // eslint-disable-line
    const newPlayGif = '/dojodachiPlaying.gif';
    const newPlay = this.state.life + 3;
    console.log('Play clicked'); // eslint-disable-line
    this.setState({
      life: newPlay,
      image: newPlayGif,
      playCount: this.state.playCount += 1,
    });
    this.updatePetLife();
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
  life: 0,
  image: '',
  name: '',
  timeSinceBirth: '',
  reduceLife: null,
  restCount: 0,
  playCount: 0,
  workCount: 0,
  foodCount: 0,
};

const mapStateToProps = state => ({
  username: state.username,
});

export default connect(mapStateToProps)(PetHealth);
