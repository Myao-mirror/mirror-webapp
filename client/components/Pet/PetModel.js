import Moment from 'moment';
import fire from '../../utils/firebase/setup';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');

class PetModel {
  constructor(name) {
    this.name = name;
    this.image = 'dojodachiIdling.gif';
    const dbPetAlive = fireUser.child('/pet/settings/status');
    dbPetAlive.once('value', (snap) => {
      const results = snap.val();
      if (results !== 'dead') {
        this.getPetAge();
        this.getPetLife();
      } else {
        this.timeBirth = new Moment();
        this.timeSinceBirth = this.timeBirth.fromNow(true);
        this.life = 100;
        const createPet = {};
        createPet['pet/settings/petAge'] = this.timeSinceBirth;
        createPet['pet/settings/life'] = this.life;
        fireUser.update(createPet);
      }
    });
  }

  getPetAge() {
    const dbPetAge = fireUser.child('/pet/settings/petAge');
    dbPetAge.once('value', (snap) => {
      const results = snap.val();
      this.timeSinceBirth = results;
    });
  }

  getPetLife() {
    const dbPetLife = fireUser.child('/pet/settings/life');
    dbPetLife.once('value', (snap) => {
      const results = snap.val();
      this.life = results;
    });
  }
}

export default PetModel;
