import Moment from 'moment';

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
  }
}
export default PetModel;
