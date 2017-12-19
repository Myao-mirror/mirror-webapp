import Moment from 'moment';
import fire from '../../utils/firebase/setup';

const dbRoot = fire.database().ref().child('voice-pi');
const fireUser = dbRoot.child('alice-kiwi');
const dbPetAlive = fireUser.child('/pet/settings/status');
const dbPetName = fireUser.child('/pet/settings/petName');
const dbPetAge = fireUser.child('/pet/settings/petAge');
const dbPetLife = fireUser.child('/pet/settings/life');

class PetModel {
  constructor(name) {
    this.name = name;

    dbPetAlive.once('value', (snap) => {
      const results = snap.val();
      if (results === 'dead') {
        this.timeBirth = new Moment();
        this.timeSinceBirth = this.timeBirth.fromNow(true);
        this.life = 100;
        const createPet = {};
        createPet['pet/settings/petName'] = this.name;
        createPet['pet/settings/petAge'] = this.timeSinceBirth;
        createPet['pet/settings/life'] = this.life;
        fireUser.update(createPet);
      } else {
        this.getPetName();
        this.getPetAge();
        this.getPetLife();
      }
    });
    this.image = 'dojodachiIdling.gif';
  }

  getPetName() {
    dbPetName.once('value', (snap) => {
      const results = snap.val();
      this.name = results;
    });
  }

  getPetAge() {
    dbPetAge.once('value', (snap) => {
      const results = snap.val();
      this.timeSinceBirth = results;
    });
  }

  getPetLife() {
    dbPetLife.once('value', (snap) => {
      const results = snap.val();
      this.life = results;
    });
  }
}

export default PetModel;
