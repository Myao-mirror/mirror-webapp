import Moment from 'moment';
import fire from '../../utils/firebase/setup';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');

class PetModel {
  constructor(name) {
    this.name = name;
    this.timeBirth = new Moment();
    this.timeSinceBirth = this.setTimeSinceBirth();
    this.life = 100;
    this.image = 'dojodachiIdling.gif';
  }

  setTimeSinceBirth() {
    this.timeSinceBirth = this.timeBirth.fromNow(true);
    const setAge = {};
    setAge['pet/settings/petAge'] = this.timeSinceBirth;
    fireUser.update(setAge);
  }
}
export default PetModel;
