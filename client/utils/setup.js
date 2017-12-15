import * as firebase from '../../node_modules/firebase';

const config = {
  apiKey: 'AIzaSyDA38lFzW1XcODJNiXClLSL3_xBQoqK-Tk',
  authDomain: 'maki-pi-voice-assistant.firebaseapp.com',
  databaseURL: 'https://maki-pi-voice-assistant.firebaseio.com',
  projectId: 'maki-pi-voice-assistant',
  storageBucket: 'maki-pi-voice-assistant.appspot.com',
  messagingSenderId: '826252237196',
};

const fire = firebase.initializeApp(config);

export default fire;
