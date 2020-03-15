import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDaynlhqbPi0HtenabQpGpw26omZ-hGS6c',
  authDomain: 'chat-c063c.firebaseapp.com',
  databaseURL: 'https://chat-c063c.firebaseio.com',
  projectId: 'chat-c063c',
  storageBucket: 'chat-c063c.appspot.com',
  messagingSenderId: '41906657985',
  appId: '1:41906657985:web:183aa5f249c45f47a65240',
};

firebase.initializeApp(config);

const db = firebase.firestore();
const storage = firebase.storage();

export { firebase, db, storage };
