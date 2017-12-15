import * as firebase from 'firebase';

// TODO: sandbox
// const config = {
//   apiKey: 'AIzaSyDfmT5Vh6zMCP83c0ZyMEMk9OnVLK26ffo',
//   authDomain: 'sandbox-6ee2a.firebaseapp.com',
//   databaseURL: 'https://sandbox-6ee2a.firebaseio.com',
//   projectId: 'sandbox-6ee2a',
//   storageBucket: 'sandbox-6ee2a.appspot.com',
//   messagingSenderId: '198557250596',
// };
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
