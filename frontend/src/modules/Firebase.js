import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBdIC0kho0PQUIrS6QHAEIJ4bYuJELJlj0',
  authDomain: 'chelin-e8ee3.firebaseapp.com',
  databaseURL:
    'https://chelin-e8ee3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chelin-e8ee3',
  storageBucket: 'chelin-e8ee3.appspot.com',
  messagingSenderId: '45691459916',
  appId: '1:45691459916:web:bb4a483ab566aacfa157e9',
  measurementId: 'G-HJWTE6REBM',
};

let database;

const fire = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  database = firebase.database();
  // Get a reference to our posts
};

/*Send data to Database(Rewrite data)*/
const writeUserData = ({ name, address, userName, date, reviewText }) => {
  database
    .ref('store')
    .orderByKey()
    .equalTo(name)
    .once('value', (snapshot) => {
      if (!snapshot.val()) {
        console.log('dd');
        database.ref('store').child(name).set({
          store_address: address,
          store_reviews: {},
        });
      }
      console.log(snapshot.val());
    });
};

export { fire, writeUserData };
