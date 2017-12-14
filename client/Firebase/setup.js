import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDfmT5Vh6zMCP83c0ZyMEMk9OnVLK26ffo',
  authDomain: 'sandbox-6ee2a.firebaseapp.com',
  databaseURL: 'https://sandbox-6ee2a.firebaseio.com',
  projectId: 'sandbox-6ee2a',
  storageBucket: 'sandbox-6ee2a.appspot.com',
  messagingSenderId: '198557250596',
};
const fire = firebase.initializeApp(config);

export default fire;
