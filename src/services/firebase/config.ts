import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCebCNa-_0EJ9gQpZ1kpm5CiAW-jT9rfY8',
  authDomain: 'mrrr-meow-calendar.firebaseapp.com',
  databaseURL:
    'https://mrrr-meow-calendar-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'mrrr-meow-calendar',
  storageBucket: 'mrrr-meow-calendar.appspot.com',
  messagingSenderId: '484809701246',
  appId: '1:484809701246:web:9dde1efe5cb4075970a52f',
  measurementId: 'G-RQ1LCBKE2E',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
