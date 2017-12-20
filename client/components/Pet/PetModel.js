import Moment from 'moment';
import fire from '../../utils/firebase/setup';

const dbRoot = fire.database().ref().child('voice-pi');

class PetModel {
  constructor(name, username) {
    this.name = name;
    this.image = '/dojodachiDancing-md.gif';
    this.fireUser = dbRoot.child(username);
    this.dbPetAlive = this.fireUser.child('/pet/settings/status');
    this.dbPetAge = this.fireUser.child('/pet/settings/petAge');
    this.dbPetLife = this.fireUser.child('/pet/settings/life');
    this.getPetName = this.getPetLife.bind(this);
    this.dbPetAlive.once('value', (snap) => {
      const results = snap.val();
      if (results === 'dead') {
        this.timeBirth = new Moment();
        this.timeSinceBirth = this.timeBirth.fromNow(true);
        this.life = 100;
        const createPet = {};
        createPet['pet/settings/petName'] = this.name;
        createPet['pet/settings/petAge'] = this.timeSinceBirth;
        createPet['pet/settings/life'] = this.life;
        this.fireUser.update(createPet);
      } else {
        this.getPetName();
        this.getPetAge();
        this.getPetLife();
        this.fireUser.update(this.createPet);
      }
    });
  }

  getPetName() {
    this.dbPetName.once('value', (snap) => {
      this.name = snap.val();
    });
  }

  getPetAge() {
    this.dbPetAge.once('value', (snap) => {
      this.timeSinceBirth = snap.val();
    });
  }

  getPetLife() {
    this.dbPetLife.once('value', (snap) => {
      this.life = snap.val();
    });
  }
}

export default PetModel;
