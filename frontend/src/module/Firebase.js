import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
} from 'firebase/firestore';
import { async } from '@firebase/util';

const firebaseConfig = {
  apiKey: 'AIzaSyBdIC0kho0PQUIrS6QHAEIJ4bYuJELJlj0',
  authDomain: 'chelin-e8ee3.firebaseapp.com',
  databaseURL:
    'https://chelin-e8ee3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chelin-e8ee3',
  storageBucket: 'chelin-e8ee3.appspot.com',
  messagingSenderId: '45691459916',
  appId: '1:45691459916:web:1868aa2d9c7d2d66a157e9',
  measurementId: 'G-CK4H0NQTJ2',
};

let database;

const getDatabase = () => {
  if (!database) {
    initializeApp(firebaseConfig);
    database = getFirestore();
    getAnalytics();
  }
  return database;
  // Get a reference to our posts
};

/*Send data to Database(Rewrite data)*/
const writeStoreData = async ({
  name,
  address,
  userName,
  date,
  reviewText,
}) => {
  if (!database) return Promise.reject('Database is not initialized');
  const storeRef = doc(database, 'store', name);
  const storeSnapShot = await getDoc(storeRef);

  if (!storeSnapShot.exists()) {
    await setDoc(doc(database, 'store', name), {
      store_address: address,
    });
  }
  const storeReviewCollection = collection(
    database,
    `store/${name}/store_reviews`,
  );
  await addDoc(storeReviewCollection, {
    user_name: userName,
    published_date: date,
    review_text: reviewText,
  });
  return Promise.resolve('success');
};

const getStoreData = async (storeName) => {
  const storeRef = doc(database, 'store', storeName);
  const storeSnapShot = await getDoc(storeRef);

  if (storeSnapShot.exists()) {
    return storeSnapShot;
  } else {
    return null;
  }
};

export { getDatabase, getStoreData, writeStoreData };
