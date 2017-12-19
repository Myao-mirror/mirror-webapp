import Moment from 'moment';
import fire from '../../utils/firebase/setup';

const dbRoot = fire.database().ref().child('voice-pi');

class PetModel {
  constructor(name) {
    this.name = name;
    this.image = '/dojodachiIdling.gif';
    this.fireUser = dbRoot.child(name);
    const dbPetAlive = this.fireUser.child('/pet/settings/status');
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
        this.fireUser.update(createPet);
      }
    });
  }

  getPetAge() {
    const dbPetAge = this.fireUser.child('/pet/settings/petAge');
    dbPetAge.once('value', (snap) => {
      const results = snap.val();
      this.timeSinceBirth = results;
    });
  }

  getPetLife() {
    const dbPetLife = this.fireUser.child('/pet/settings/life');
    dbPetLife.once('value', (snap) => {
      const results = snap.val();
      this.life = results;
    });
  }
}

export default PetModel;
