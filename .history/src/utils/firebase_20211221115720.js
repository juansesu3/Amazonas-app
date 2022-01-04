import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGK3dGtQuup5tg2tRb05sqkO17uaSzrOw",
    authDomain: "as-sprint3.firebaseapp.com",
    projectId: "as-sprint3",
    storageBucket: "as-sprint3.appspot.com",
    messagingSenderId: "615167166772",
    appId: "1:615167166772:web:b174815561f73080fb3d61"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth()

  export {db, auth}
  